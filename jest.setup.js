const fs = require('fs')
const path = require('path')

beforeAll(() => {
  const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8')
  document.documentElement.innerHTML = html
})
