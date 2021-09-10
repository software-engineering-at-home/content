const marked = require('marked')
const cheerio = require('cheerio')
const fs = require('fs/promises')

function markdownTo$(markdown) {
  const html = marked(markdown)
  const doc = `<html><body>${html}</body></html>`
  return cheerio.load(html)
}

async function run() {
  const topics = await fs.readFile('./TOPICS.md', 'utf8')
  const $ = markdownTo$(topics)

  const headings = $('h1, h2, h3, h4, h5, h6').toArray().map(el => `${el.name}: ${$(el).text()}`)
  console.log('Headings', headings)
}

run()