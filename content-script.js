
let remove_elements = (elements_list) =>
{
    let len = elements_list.length
    while(len--)
    {
        // console.log('Removing ad',
        //         elements_list[len].innerText.trim()
        //     )

        if (!elements_list[len].remove)
            continue

        elements_list[len].remove()
    }
}

let get_element_parent = (el) =>
{
    return el.classList.contains('_5jmm') ?
                el : get_element_parent(el.parentElement)
}

let get_elements_parents = (elements_list) =>
{
    let els = []
    let i = 0, len = elements_list.length
    for(; i < len; i++)
    {
        els.push(
            get_element_parent(elements_list[i])
        )
    }
    return els
}

let get_and_remove_elements = (selector) =>
{
    let els = get_elements_parents(
        document.querySelectorAll(selector)
    )
    remove_elements(els)
}

let remove_sponsored_link = () =>
{
    get_and_remove_elements('.uiStreamSponsoredLink')
}

let remove_suggested_posts = () =>
{
    get_and_remove_elements('._5g-l')
}

let remove_adds = () =>
{
    remove_sponsored_link()
    remove_suggested_posts()
}


// First remove the right column
document.getElementById('rightCol').remove()

// Now remove current ads
remove_adds()

// And remove future ads
new MutationObserver(remove_adds)
    .observe(
        document.getElementById('contentArea'),
        {
            childList: true,
            subtree: true
        }
    )
