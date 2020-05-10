
let count = 0;

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) =>
    {
        if (request.type === 'add_count') { 
            chrome.browserAction.setBadgeText({ text: (++count).toString() });
            chrome.browserAction.setTitle({ title: `Latest bloked ad: ${request.text}` })
        }

        if (request.type === 'reset_count') {
            count = 0;
            chrome.browserAction.setBadgeText({ text: '' });
        } 

        // Must return true if we want to work with response...
        // https://www.chromium.org/Home/chromium-security/extension-content-script-fetches
        return true;
    });
