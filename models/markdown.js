/* Run this from the root using: node models/markdown.js */
const fs = require('fs/promises')
const { convertMarkdownToDocument } = require('./utils/markdown2json')

async function convertMarkdownFileToJsonFile(inputpath, outputpath) {
  const markdown = await fs.readFile(inputpath, 'utf8')
  const document = convertMarkdownToDocument(markdown)
  return await fs.writeFile(outputpath, JSON.stringify(document, null, 2), 'utf8')
}

async function run() {
  const outputdir = 'models/generated/'
  const files = [
    'README.md',
    'SOCIAL-MEDIA-CHECKLIST.md',
    'TOPICS.md',
    'WRITING-GUIDE.md',
    'WRITING-TEMPLATE.md'
  ]

  const work = files.map(filepath => {
    const outputname = filepath.toLowerCase().split('.')[0] + '.json'
    const outputpath = `${outputdir}${outputname}`
    return convertMarkdownFileToJsonFile(filepath, outputpath)
  })

  await Promise.all(work)
}

run()