'use babel'

import stripAnsi from 'strip-ansi'

function createNewProgress() {
  let child = document.createElement('span')
  child.style.width = '100%'
  child.style.display = 'flex'
  child.style.flexWrap = 'wrap'
  progressText = document.createElement('span')
  progress = document.createElement('progress')
  progress.style.flexGrow = 1
  progress.style.marginTop = 'auto'
  progress.style.marginBottom = 'auto'
  progress.style.minWidth = '50%'
  progress.max = 100
  child.appendChild(progressText)
  child.appendChild(progress)
  return child
}

export default class NotificationManager {
  constructor() {
    this.notifications = {}
  }

  get(idx) {
    return this.notifications[idx.toString()]
  }

  handleNotification(data) {
    data.notify_value = data.notify_value.toString()
    let notification = this.get(data.notify_value)
    if(typeof notification === 'undefined') {
      this.notifications[data.notify_value] = {
        'notification': atom.notifications.addInfo(stripAnsi(data.text), {dismissable: true}),
        'detail': null,
        'timeout': null
      }
      notification = this.notifications[data.notify_value]
      const notificationView = atom.views.getView(notification['notification']).element
      notification['detail'] = notificationView.querySelector('.detail-content') || notificationView.querySelector('.content')
      notification['detail'].parentNode.style.display = 'block'
    }
    try {
        let child = notification['detail'].lastChild
        if(data.type == 'notify/echo') {
          if(!child || child.tagName != 'DIV') {
            child = document.createElement('div')
            child.style.whiteSpace = 'pre-wrap'
            notification['detail'].appendChild(child)
          }
          child.textContent += stripAnsi(data.text)
        }
        if(data.type == 'notify/progress') {
          const newLabel = data.text + ' '
          const newValue = data.pct * 100
          if(!child || child.tagName != 'SPAN') {
            child = createNewProgress()
            notification['detail'].appendChild(child)
          }
          const hasNewLabel = (newLabel != child.firstChild.textContent)
          if(hasNewLabel && newValue < child.lastChild.value) {
            child = createNewProgress()
            notification['detail'].appendChild(child)
          }
          if(data.text) {
            if(hasNewLabel) {
              child.firstChild.textContent = newLabel

              if(window.getComputedStyle(child.lastChild).getPropertyValue("width") ==
                 window.getComputedStyle(child).getPropertyValue("width")) {
                child.firstChild.textContent += '↴'
              }
            }
          } else {
            child.firstChild.textContent = ''
          }
          child.lastChild.value = newValue
        }
        if(notification['timeout']) {
          clearTimeout(notification['timeout'])
        }
        notification['timeout'] = setTimeout((notification) => {
          notification.dismiss()
        }, 5000, notification['notification'])
    } catch(e) { console.log(e) }
  }
}
