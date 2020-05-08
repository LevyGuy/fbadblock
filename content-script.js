const MESSAGE_TYPE = {
    add_count: 'add_count',
    reset_count: 'reset_count'
};

function sendMessageToBackground({type, text = ''}) {
    chrome.runtime.sendMessage({ type: type, text: text });
}

function isTextAd(txt) {
    if (!txt) return false;
    if (txt.indexOf('Sponsored') !== -1) return true;
    if (txt.indexOf('Paid Partnership') !== -1) return true;
    if (txt.indexOf('Suggested for You') !== -1) return true;
    return false;
}

function remove_adds() {
    const feed = document
        .querySelector('div[role=feed]');
    if (!feed) return;

    const pagelets = feed.querySelectorAll('div[data-pagelet]');
    if (!pagelets || !pagelets.length) return;

    pagelets.forEach(el => {
        Array.from(el.querySelectorAll('*'))
            .forEach(iel => {
                if(iel.style.position === 'absolute') {
                    iel.remove();
                }
            });
        const isAd = isTextAd(el.innerText);
        if (isAd) {
            el.remove();
            console.log('Removed AD: \n', el.innerText);
        }
    })
}

// // Now remove current ads
// sendMessageToBackground({type: MESSAGE_TYPE.reset_count});
remove_adds();
window.addEventListener('scroll', remove_adds);