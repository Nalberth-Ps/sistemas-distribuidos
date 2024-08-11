async function fetchGraphHtml() {
  const response = await fetch('http://localhost:3000/graph/generate-graph', {
    mode: 'cors',
  })
  const html = await response.text()
  return html
}

export async function insertGraph() {
  const graphHtml = await fetchGraphHtml()

  const graphContainer = document.getElementById('graph-container')
  if (!graphContainer) return console.error('Graph container not found')

  graphContainer.innerHTML = graphHtml
}
