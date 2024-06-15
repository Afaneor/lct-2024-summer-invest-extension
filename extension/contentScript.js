// const root = document.createElement('div')
// root.id = `shadow-root`
// const shadowRoot = root.attachShadow({ mode: 'open' })

// Создаем уникальный контейнер для вашего React-приложения
const containerId = 'root-invest-plugin'
let appContainer = document.getElementById(containerId)

if (!appContainer) {
  appContainer = document.createElement('div')
  appContainer.id = containerId
  document.body.appendChild(appContainer)
}

// Подключаем стили вашего React-приложения
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = chrome.runtime.getURL('static/css/main.css')
document.head.appendChild(link)

// Подключаем скрипт вашего React-приложения
const script = document.createElement('script')
script.src = chrome.runtime.getURL('static/js/main.js')
document.body.appendChild(script)

// // Добавляем контейнер в DOM
// document.body.appendChild(root)
