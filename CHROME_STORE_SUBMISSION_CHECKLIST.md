# Chrome Web Store Submission Checklist

## Step-by-Step Guide to Complete Privacy Practices Tab

### 1. Single Purpose

Question: What is the single purpose of your extension?

Answer:
```
This extension highlights UK or US English spelling variations on webpages to help users identify spelling inconsistencies.
```

---

### 2. Permission Justifications

#### activeTab Permission

Question: Why do you need the activeTab permission?

Answer:
```
The activeTab permission is required to access and read the text content of the currently active webpage when the user clicks the extension icon and chooses to highlight UK or US spellings. This permission allows the extension to scan the page content and apply visual highlighting to matching words. The permission is only used when the user explicitly clicks the extension icon and selects a highlighting mode.
```

#### scripting Permission

Question: Why do you need the scripting permission?

Answer:
```
The scripting permission is required to inject the content script and CSS styles into the active webpage to perform text highlighting. When a user clicks "Highlight UK English" or "Highlight US English", the extension needs to inject a content script that scans the page for spelling variations and inject CSS styles that apply visual highlighting. This permission is only used on the active tab when the user explicitly initiates a scan. The extension uses programmatic injection combined with activeTab, ensuring scripts only run when the user clicks the extension icon.
```

#### Host Permissions (<all_urls>)

Question: Why does your extension need host permissions for all URLs?

Answer:
```
The extension requires host permissions for all URLs because users need to highlight UK or US spellings on any website they visit, including documentation sites, Google Docs, GitHub, content management systems, and blogs. The extension uses programmatic injection (chrome.scripting.executeScript) which requires host permissions to inject scripts. However, the extension only activates when the user explicitly clicks the extension icon and selects a scan mode. Scripts are never injected automatically. The extension does not collect, store, or transmit any data from any website. It only performs local text analysis and temporary visual highlighting when requested by the user.
```

#### Remote Code

Question: Does your extension execute remote code?

Answer:
```
No. This extension does NOT use remote code. All code is bundled within the extension package at installation time. The extension does not fetch any JavaScript from external servers, does not use eval() or similar dynamic code execution, does not load any external libraries at runtime, and operates 100% offline with no network requests.
```

---

### 3. Data Usage Disclosure

Question: Does your extension collect or transmit user data?

Answer: **NO** (select "No" for all categories)

Check these boxes:
- [ ] Do not use data for purposes unrelated to the item's core functionality
- [x] Do not sell or transfer user data to third parties
- [x] Do not use or transfer user data for purposes unrelated to the item's core functionality

For each data type, select: **NOT collected**
- User activity: NOT collected
- Website content: NOT collected
- Personally identifiable information: NOT collected
- Financial information: NOT collected
- Authentication information: NOT collected
- Personal communications: NOT collected
- Location: NOT collected
- Web history: NOT collected

---

### 4. Privacy Policy

Question: Do you have a privacy policy?

Answer: **Optional** (since you don't collect any data)

If you want to add one, use this simple statement:

```
Privacy Policy for UK ↔ US Spelling Highlighter

This extension does not collect, store, or transmit any user data.

All processing happens locally in your browser. The extension:
- Does not track your browsing activity
- Does not collect website content
- Does not store any personal information
- Does not make any network requests
- Operates 100% offline

Your privacy is fully protected at all times.

Contact: [Your email or GitHub issues link]
```

---

### 5. Certification

Check the box that says:
```
[x] I certify that my product complies with all Chrome Web Store Developer Program Policies
```

---

## Final Checklist Before Submitting

- [x] All permission justifications filled out
- [x] Single purpose description provided
- [x] Data usage disclosure completed (all marked as NOT collected)
- [x] Remote code justification provided (marked as NO)
- [x] Privacy policy added (optional but recommended)
- [x] Certification checkbox checked
- [ ] Save Draft
- [ ] Submit for Review

---

## Additional Notes

After completing the Privacy practices tab:

1. Click "Save Draft" at the bottom
2. Go back to the main submission page
3. All red error messages should be gone
4. Click "Submit for Review"
5. Review typically takes 1-3 business days

---

## Common Issues

**If you still see errors:**
- Make sure you clicked "Save Draft" on the Privacy practices tab
- Refresh the main submission page
- All fields must have text (can't be empty)
- Make sure you checked the certification checkbox

**If rejected:**
- Check email for specific reason
- Address the concern
- Resubmit

---

Contact for help:
GitHub Issues: https://github.com/antivirusakash/uk-us-spelling-switch-figma-plugin/issues
