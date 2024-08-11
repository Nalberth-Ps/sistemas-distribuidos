import './styles/main.css'
import { initializeForm } from './components/Form'
import { insertGraph } from './components/Graph'
import { setupNavbar } from './components/NavBar'

document.addEventListener('DOMContentLoaded', () => {
  initializeForm()
  insertGraph()
  setupNavbar('.navbar-link', 'dollar-monitoring-form')
})
