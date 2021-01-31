function getParamsFromUrl(url) {
  const decodedUrl = decodeURI(url)
  if (typeof decodedUrl === 'string') {
    let paramStr = (decodedUrl.split('?')[1] || '').split('#')[0]
    let pairs = paramStr.split('&').map(kvp => kvp.split('='))
    let params = pairs.reduce((acc, [key, value]) => {
      if (key) {
        acc[key] = value
      }
      return acc
    }, {})
    return params
  }
}

function startSlides() {
  const params = getParamsFromUrl(document.location)
  const { view } = params

  const sourceUrl = view || 'TOPICS.md'
  const slideshow = remark.create({ sourceUrl })

  console.log('Params:', params)
  console.log('Started remark slideshow:', slideshow, 'from', sourceUrl)

  slideshow.on('showSlide', rewriteMarkdownLinks)
}

let rewriteLock = false
function rewriteMarkdownLinks(slide) {
  if (rewriteLock) {
    return
  }
  rewriteLock = true

  console.log('Rewriting markdown links to improve slide navigation:')
  const slidesAreaEl = document.getElementsByClassName('remark-slides-area')[0]
  const hrefEls = Array.from(slidesAreaEl.getElementsByTagName('a'))
  const rewrittenUrls = hrefEls.reduce(rewriteMarkdownLink, [])
  console.log('Found and rewrote:', rewrittenUrls.length, 'slide links in this presentation.')
}

function rewriteMarkdownLink(list, el) {
  const pattern = /\/([A-z\d-/]+.md)$/
  const href = new URL(el.href)
  const [,markdownPath] = (href.pathname.match(pattern) || [])
  const rewrittenAlready = href.pathname.includes('?view=')
  if (markdownPath && !rewrittenAlready) {
    const slideViewerPath = `?view=${markdownPath}`
    // console.log('Rewriting', el, markdownPath, 'from', el.href, 'to', slideViewerPath)
    el.href = slideViewerPath
    list.push(el)
  }
  return list
}

if (typeof remark !== undefined) {
  startSlides()
} else {
  console.log('Remark library not available on DOM; could not start slides.')
}