let number_of_blocked_items = 0

let closest = (el, classStr) => {
    return el.classList.contains(classStr) ?
        el : closest(el.parentElement, classStr)
}

let remove_post = (el) => {
    let postElement = closest(el, '_5jmm')
    if (!postElement || !postElement.remove)
        return

    // console.log('removing post: ', postElement.textContent)

    postElement.remove()
    chrome.runtime.sendMessage({
        from: 'content-script',
        title: postElement.textContent,
        num: ++number_of_blocked_items
    })
}

let is_suggested_post = (el) => {
    return el.textContent.indexOf('Suggested Post') !== -1
}

let is_sponsored_post = (el) => {
    return el.textContent.indexOf('Sponsored') !== -1
}

let is_you_may_liked_post = (el) => {
    return el.textContent.indexOf('You May Like') !== -1
}

let remove_adds = () => {
    
    document.querySelectorAll('._5va4')
        .forEach(el => {
            if (is_suggested_post(el) || is_sponsored_post(el))
                remove_post(el)
        })

    document.querySelectorAll('._5g-l')
        .forEach(el => {
            if (is_you_may_liked_post(el))
                remove_post(el)
        })
}

// Remove the right column and adjust style
document.getElementById('contentArea').style.position = 'static'
document.getElementById('rightCol').remove()

// Now remove current ads
remove_adds()

// And remove future ads
new MutationObserver(remove_adds)
    .observe(
        document.body, {
            childList: true,
            subtree: true
        }
    )
