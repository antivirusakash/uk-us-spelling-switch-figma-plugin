// State
let currentResults: any = null;

// Elements
const scanUkBtn = document.getElementById('scan-uk-btn') as HTMLButtonElement;
const scanUsBtn = document.getElementById('scan-us-btn') as HTMLButtonElement;
const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;
const resultsDiv = document.getElementById('results') as HTMLDivElement;

// Scan UK English button
scanUkBtn.addEventListener('click', async () => {
  await highlightSpelling('UK');
});

// Scan US English button
scanUsBtn.addEventListener('click', async () => {
  await highlightSpelling('US');
});

// Clear button
clearBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.id) {
    try {
      await chrome.tabs.sendMessage(tab.id, { type: 'clear' });
      resultsDiv.classList.add('hidden');
      currentResults = null;
    } catch (error) {
      // Content script not loaded, nothing to clear
      resultsDiv.classList.add('hidden');
      currentResults = null;
    }
  }
});

// Check if content script is loaded
async function isContentScriptLoaded(tabId: number): Promise<boolean> {
  try {
    await chrome.tabs.sendMessage(tabId, { type: 'ping' });
    return true;
  } catch {
    return false;
  }
}

// Inject content script programmatically
async function injectContentScript(tabId: number): Promise<boolean> {
  try {
    // Inject the content script
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content.js']
    });

    // Inject the CSS
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: ['highlight.css']
    });

    // Wait and verify the script is loaded (retry up to 5 times)
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        const response = await chrome.tabs.sendMessage(tabId, { type: 'ping' });
        if (response && response.loaded) {
          return true;
        }
      } catch (e) {
        // Script not ready yet, continue loop
        console.log(`Ping attempt ${i + 1} failed, retrying...`);
      }
    }

    console.error('Content script injected but not responding to ping');
    return false;
  } catch (error) {
    console.error('Failed to inject content script:', error);
    return false;
  }
}

// Highlight spelling function
async function highlightSpelling(target: 'UK' | 'US') {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.id) return;

  // Check if we can access this tab
  if (tab.url?.startsWith('chrome://') ||
      tab.url?.startsWith('edge://') ||
      tab.url?.startsWith('chrome-extension://') ||
      tab.url?.startsWith('about:')) {
    resultsDiv.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🚫</div>
        <div>Cannot scan this page. Chrome extensions don't work on browser internal pages.</div>
        <div style="margin-top: 8px; font-size: 10px;">Try a regular website like Wikipedia or a blog.</div>
      </div>
    `;
    resultsDiv.classList.remove('hidden');
    return;
  }

  // Show loading state
  const activeBtn = target === 'UK' ? scanUkBtn : scanUsBtn;
  const originalText = activeBtn.textContent;
  activeBtn.disabled = true;
  activeBtn.textContent = 'Scanning...';

  try {
    // Check if content script is already loaded
    const isLoaded = await isContentScriptLoaded(tab.id);

    // If not loaded, inject it
    if (!isLoaded) {
      const injected = await injectContentScript(tab.id);

      if (!injected) {
        throw new Error('Failed to inject content script');
      }
    }

    // Send message to content script
    const response = await chrome.tabs.sendMessage(tab.id, {
      type: 'highlight',
      target
    });

    // Display results
    if (response && response.count !== undefined) {
      displayResults(response.count, target, response.words || []);
    }
  } catch (error) {
    console.error('Error highlighting:', error);

    // Show friendly error message
    const errorDetails = error instanceof Error ? error.message : 'Unknown error';
    resultsDiv.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚠️</div>
        <div>Could not scan this page.</div>
        <div style="margin-top: 8px; font-size: 10px;">
          <strong>Try these steps:</strong><br>
          1. Reload the page (Ctrl+R or Cmd+R)<br>
          2. Click the extension icon again<br>
          3. Close and reopen the tab<br>
          4. If still not working, the site may block extensions
        </div>
        ${errorDetails.includes('connection') ? `
          <div style="margin-top: 8px; font-size: 9px; color: #999;">
            Note: If you just installed/updated the extension, you must reload the page first.
          </div>
        ` : ''}
      </div>
    `;
    resultsDiv.classList.remove('hidden');
  } finally {
    // Reset button state
    activeBtn.disabled = false;
    activeBtn.textContent = originalText;
  }
}

// Display results
function displayResults(count: number, target: 'UK' | 'US', words: string[]) {
  resultsDiv.classList.remove('hidden');

  if (count === 0) {
    resultsDiv.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">✓</div>
        <div>No ${target} English spellings found on this page.</div>
      </div>
    `;
    return;
  }

  const variant = target === 'UK' ? 'UK' : 'US';
  const color = target === 'UK' ? '#007bff' : '#ff9500';

  // Create word list HTML
  const wordListHTML = words.length > 0 ? `
    <div style="margin-top: 12px; padding: 8px; background: #f8f9fa; border-radius: 4px; max-height: 200px; overflow-y: auto;">
      <div style="font-size: 10px; font-weight: 600; color: #666; margin-bottom: 6px; text-transform: uppercase;">
        Found ${words.length} unique word${words.length !== 1 ? 's' : ''}:
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 4px;">
        ${words.map(word => `
          <span style="background: ${color}22; color: ${color}; padding: 3px 8px; border-radius: 3px; font-size: 11px; font-weight: 500; border: 1px solid ${color}44;">
            ${word}
          </span>
        `).join('')}
      </div>
    </div>
  ` : '';

  resultsDiv.innerHTML = `
    <div class="total-badge" style="background: ${color}">
      ${count} ${variant} spelling${count !== 1 ? 's' : ''} highlighted
    </div>
    <div style="color: #666; font-size: 11px; margin-top: 8px;">
      Words are highlighted in <span style="background: ${color}33; padding: 2px 4px; border-radius: 2px; font-weight: 600;">${variant === 'UK' ? 'blue' : 'orange'}</span> on the page.
    </div>
    ${wordListHTML}
  `;
}
