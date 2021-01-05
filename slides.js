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
}

if (typeof remark !== undefined) {
  startSlides()
} else {
  console.log('Remark library not available on DOM; could not start slides.')
}