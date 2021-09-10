/* Run this from the root using: node models/markdown.js */
const { find, clean, make, read, write, position } = require('promise-path')
const { convertMarkdownToDocument } = require('./utils/markdown2json')

async function convertMarkdownFileToJsonFile(inputpath, outputpath) {
  const markdown = await read(inputpath, 'utf8')
  const document = convertMarkdownToDocument(markdown)
  return await write(outputpath, JSON.stringify(document, null, 2), 'utf8')
}

async function run() {
  const root = position(__dirname, '..')
  const outputdir = root('models/generated/')
  const files = (await find('**/*.md')).filter(n => !n.includes('node_modules'))

  await clean(outputdir)
  await make(outputdir)

  console.log('Files', files)

  const work = files.map(filepath => {
    const outputname = filepath.toLowerCase().split('.')[0] + '.json'
    const outputpath = `${outputdir}${outputname}`
    return convertMarkdownFileToJsonFile(filepath, outputpath)
  })

  await Promise.all(work)
}

run()