const MESSAGE_TYPE = {
    add_count: 'add_count',
    reset_count: 'reset_count'
};

function sendMessageToBackground({type, text = ''}) {
    chrome.runtime.sendMessage({ type: type, text: text });
}

const regexp = /Sponsored|Paid Partnership|Suggested for You/g;

function isTextAd(txt) {
    if (!txt) return false;
    return regexp.test(txt);
}

function remove_adds() {
    const feed = document
        .querySelector('div[role=feed]');
    if (!feed) return;

    const pagelets = feed.querySelectorAll('div[data-pagelet]');
    if (!pagelets || !pagelets.length) return;

    pagelets.forEach(el => {

        // We don't want to iterate on that element over an over.
        //  So we mark it
        if (el._fbadb) {
            return;
        }
        el._fbadb = 1;

        el.querySelectorAll('*')
            .forEach(iel => {
                if(iel.style.position === 'absolute') {
                    iel.remove();
                }
            });

        const isAd = isTextAd(el.innerText);
        if (isAd) {
            el.remove();
            const {innerText} = el;
            console.log('Removed AD: \n', innerText);
            sendMessageToBackground({
                type: MESSAGE_TYPE.add_count,
                text: innerText
            });
        }
    })
}

// Reset the count on entering the page
sendMessageToBackground({type: MESSAGE_TYPE.reset_count});
// Now remove current ads
remove_adds();
// And remove future ads
window.addEventListener('scroll', remove_adds);