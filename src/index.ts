// src/index.ts

import './styles/main.css';
import { greet } from './components/Greeting';

document.addEventListener('DOMContentLoaded', () => {
  const greetingElement = document.getElementById('greeting');
  if (greetingElement) {
    greetingElement.textContent = greet('World');
  }
});
