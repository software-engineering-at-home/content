const express = require('express')
const fs = require('fs/promises')
const path = require('path')
const { name } = require('./package.json')
const app = express()
const port = 8080

app.get('/content/', async (req, res) => {
  const filepath = path.joinb(__dirname, 'slides.html')
  const html = await fs.readFile(filepath, 'utf8')
  res.send(html)
})

app.use('/content/', express.static(__dirname))

app.listen(port, () => {
  console.log(`${name} server running at: http://localhost:${port}/content/`)
})
