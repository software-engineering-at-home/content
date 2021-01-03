const express = require('express')
const fs = require('fs/promises')
const { name } = require('./package.json')
const app = express()
const port = 8080

app.get('/', async (req, res) => {
  const html = await fs.readFile(`${__dirname}/slides.html`, 'utf8')
  res.send(html)
})

app.use('/', express.static(__dirname))

app.listen(port, () => {
  console.log(`${name} server running at: http://localhost:${port}`)
})