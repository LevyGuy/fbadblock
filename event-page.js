chrome.runtime.onMessage.addListener(d =>
{
    if (d.from !== 'content-script' || !d.num || !d.title)
        return

    chrome.browserAction.setBadgeText({ text: d.num.toString() })
    chrome.browserAction.setTitle({ title: `Latest bloked ad: ${d.title}` })
});
