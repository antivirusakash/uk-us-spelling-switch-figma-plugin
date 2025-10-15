# Chrome Web Store Privacy Practices Justifications

Copy and paste these justifications into the Privacy practices tab of your Chrome Web Store submission.

---

## Single Purpose Description

This extension has a single purpose: to highlight UK or US English spelling variations on webpages. Users can click to highlight either UK spellings (colour, organise, favourite) or US spellings (color, organize, favorite) on any webpage they visit. The extension provides visual highlighting and a list of matched words to help users identify spelling inconsistencies.

---

## Permission: activeTab

Justification:

The activeTab permission is required to access and read the text content of the currently active webpage when the user clicks the extension icon and chooses to highlight UK or US spellings. This permission allows the extension to scan the page content and apply visual highlighting to matching words. The permission is only used when the user explicitly clicks the extension icon and selects a highlighting mode.

---

## Permission: scripting

Justification:

The scripting permission is required to inject the content script and CSS styles into the active webpage to perform text highlighting. When a user clicks "Highlight UK English" or "Highlight US English", the extension needs to:

1. Inject a content script that scans the page for spelling variations
2. Inject CSS styles that apply visual highlighting (blue for UK, orange for US)
3. Communicate between the popup and content script to display results

This permission is only used on the active tab when the user explicitly initiates a scan. No scripts are injected without user action. The extension uses programmatic injection (not content_scripts) combined with activeTab, ensuring scripts only run when the user clicks the extension icon.

---

## Remote Code

Justification:

This extension does NOT use remote code. All code is bundled within the extension package at installation time. The extension:

- Does not fetch any JavaScript from external servers
- Does not use eval() or similar dynamic code execution
- Does not load any external libraries at runtime
- Operates 100% offline with no network requests

All functionality is self-contained within the extension files distributed through the Chrome Web Store.

---

## Data Usage & Privacy Certification

This extension does NOT collect, store, or transmit any user data:

✓ No analytics or tracking
✓ No network requests
✓ No cookies or local storage of user data
✓ No data transmission to external servers
✓ All processing happens locally in the browser
✓ No personally identifiable information is accessed or stored

The extension only:
- Reads page text content when user clicks the extension icon
- Applies temporary visual highlighting to the current page
- Displays match counts and word lists in the popup
- All data is temporary and discarded when the popup closes or highlights are cleared

Data handling practices:
- User activity: NOT collected
- Website content: NOT collected (only temporarily processed for highlighting)
- Personally identifiable information: NOT collected
- Financial information: NOT collected
- Authentication information: NOT collected

---

## Certification Statement

I certify that:

1. This extension complies with Chrome Web Store Developer Program Policies
2. The extension does not collect, store, or transmit any user data
3. All permissions are used only for the stated single purpose
4. The extension operates entirely offline with no network activity
5. User privacy is fully protected at all times
