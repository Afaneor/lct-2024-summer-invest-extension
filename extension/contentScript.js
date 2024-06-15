// // const root = document.createElement('div')
// // root.id = `shadow-root`
// // const shadowRoot = root.attachShadow({ mode: 'open' })
//
// // Создаем уникальный контейнер для вашего React-приложения
// const containerId = 'root-invest-plugin'
// let appContainer = document.getElementById(containerId)
//
// if (!appContainer) {
//   appContainer = document.createElement('div')
//   appContainer.id = containerId
//   document.body.appendChild(appContainer)
// }
//
// // Подключаем стили вашего React-приложения
// const link = document.createElement('link')
// link.rel = 'stylesheet'
// link.href = chrome.runtime.getURL('static/css/main.css')
// document.head.appendChild(link)
//
// // Подключаем скрипт вашего React-приложения
// const script = document.createElement('script')
// script.src = chrome.runtime.getURL('static/js/main.js')
// document.body.appendChild(script)
//
// // // Добавляем контейнер в DOM
// // document.body.appendChild(root)

// Создаем и настраиваем контейнер для iframe
const containerId = 'smart-assistant-chat-widget'
let appContainer = document.getElementById(containerId)

if (!appContainer) {
  appContainer = document.createElement('div')
  appContainer.id = containerId
  document.body.appendChild(appContainer)

  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.bottom = '160px'
  iframe.style.right = '25px'
  iframe.style.width = '600px'
  iframe.style.height = `${window.innerHeight * 0.8}px` // Устанавливаем высоту как 80% от высоты окна
  iframe.style.zIndex = '100000'
  iframe.style.border = 'none'
  iframe.style.display = 'none' // Начнем с того, что контейнер скрыт
  iframe.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)'

  // Устанавливаем источник iframe на ваш файл
  iframe.src = chrome.runtime.getURL('iframe.html')

  // Добавляем iframe в контейнер
  appContainer.appendChild(iframe)

  // Создаем кнопку для управления видимостью контейнера
  const toggleButton = document.createElement('button')
  toggleButton.style.position = 'fixed'
  toggleButton.style.bottom = '100px'
  toggleButton.style.right = '10px'
  toggleButton.style.zIndex = '100001' // Убедитесь, что кнопка будет сверху
  toggleButton.style.width = '60px'
  toggleButton.style.height = '60px'
  toggleButton.style.backgroundColor = '#007bff'
  toggleButton.style.color = '#fff'
  toggleButton.style.border = 'none'
  toggleButton.style.borderRadius = '50%' // Делаем кнопку круглой
  toggleButton.style.cursor = 'pointer'
  toggleButton.style.display = 'flex'
  toggleButton.style.alignItems = 'center'
  toggleButton.style.justifyContent = 'center'

  // Добавляем иконку в кнопку
  const icon = document.createElement('img')
  const showIconSrc = chrome.runtime.getURL('icons/chat-outline.png') // Замените 'show-icon.png' на путь к вашей иконке для показа
  const hideIconSrc = chrome.runtime.getURL('icons/close.png') // Замените 'hide-icon.png' на путь к вашей иконке для скрытия
  icon.src = showIconSrc
  icon.style.width = '30px' // Устанавливаем размер иконки
  icon.style.height = '30px'
  toggleButton.appendChild(icon)

  // Добавляем обработчик событий для кнопки
  toggleButton.addEventListener('click', () => {
    if (iframe.style.display === 'none') {
      iframe.style.display = 'block'
      icon.src = hideIconSrc // Меняем иконку на иконку для скрытия
    } else {
      iframe.style.display = 'none'
      icon.src = showIconSrc // Меняем иконку на иконку для показа
    }
  })

  // Добавляем кнопку на страницу
  appContainer.appendChild(toggleButton)
}
