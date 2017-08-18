let number_of_blocked_items = 0

let closest = (el, classStr) => {
    return el.classList.contains(classStr) ?
        el : closest(el.parentElement, classStr)
}

let remove_post = (el, wrapperClass = '_5jmm') => {
    let postElement = closest(el, wrapperClass)
    if (!postElement || !postElement.remove)
        return

    postElement.remove()

    chrome.runtime.sendMessage({
        from: 'content-script',
        title: postElement.textContent,
        num: ++number_of_blocked_items
    })
}

let find_text_in_element = (el, text) =>
{
    return el.textContent.indexOf(text) !== -1
}

let is_suggested_post = (el) => {
    return find_text_in_element(el, 'Suggested Post')
}

let is_recommended_post = (el) => {
    return find_text_in_element(el, 'Recommended')
}

let is_sponsored_post = (el) => {
    return find_text_in_element(el, 'Sponsored')
}

let is_you_may_liked_post = (el) => {
    return find_text_in_element(el, 'You May Like')
}

let is_popular_across_facebook = (el) => {
    return find_text_in_element(el, 'Popular Across Facebook')
}

let is_related = (el) =>
{
    return find_text_in_element(el, 'Related')
}

let remove_right_column = () =>
{
    document.getElementById('contentArea').style.position = 'static'

    let el = document.getElementById('rightCol')
    if (el && el.remove)
        el.remove()
}

let remove_adds = () => {

    remove_right_column()

    document.querySelectorAll('._5va4')
        .forEach(el => {
            if (is_suggested_post(el) || is_sponsored_post(el))
                remove_post(el)
        });

    document.querySelectorAll('._5_xt')
        .forEach(el => {
            if (is_popular_across_facebook(el))
                remove_post(el)
        })

    document.querySelectorAll('._5g-l, .fwb')
        .forEach(el => {
            if (is_you_may_liked_post(el) || is_recommended_post(el))
                remove_post(el)
        })
}


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
