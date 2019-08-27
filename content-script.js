const MESSAGE_TYPE = {
    add_count: 'add_count',
    reset_count: 'reset_count'
};

function sendMessageToBackground(type) {
    chrome.runtime.sendMessage({ type: type });
}

function isTextAd(txt) {
    if (!txt) return false;
    if (txt.indexOf('Sponsored') !== -1) return true;
    if (txt.indexOf('Paid Partnership') !== -1) return true;
    if (txt.indexOf('Suggested for You') !== -1) return true;
    return false;
}

function checkAdInArray(arr) {
    for(let i = 0; i < 5; i++) {
        if (isTextAd(arr[i])) return true;
    }
    return false;
}

function removeElement(el) {
    el.remove();
    sendMessageToBackground(MESSAGE_TYPE.add_count);
}

function checkForWords(el) {
    const arr = el.innerText.split('\n');
    if(checkAdInArray(arr)) {
        removeElement(el);
    }
}

function checkForFuzzer(el) {
    const h5 = el.querySelector('h5');
    if (!h5) return;
    const next = h5.nextElementSibling;
    if (!next) return;
    const isFuzzed = next.innerText === ' . ';
    if (isFuzzed) {
        removeElement(el);
    }
}

function checkElementForAds(el) {
    checkForWords(el);
    checkForFuzzer(el);
}

function remove_adds() {
    document.querySelectorAll('._5jmm')
    .forEach(checkElementForAds)
}

// // Now remove current ads
remove_adds();
sendMessageToBackground(MESSAGE_TYPE.reset_count);


// And remove future ads
// new MutationObserver(remove_adds)
//     .observe(
//         document.body, 
//         {
//             childList: true,
//             subtree: true
//         }
//     )
window.addEventListener('scroll', remove_adds);
// window.addEventListener('beforeunload', _ => 
//     sendMessageToBackground(MESSAGE_TYPE.reset_count));