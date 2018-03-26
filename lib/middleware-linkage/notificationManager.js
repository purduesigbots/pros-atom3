'use babel'

export default class NotificationManager {
  constructor() {
    this.notifications = {}
  }

  get(idx) {
    return this.notifications[idx.toString()]
  }

  handleNotification(data) {
    data.notify_value = data.notify_value.toString()
    notification = this.get(data.notify_value)
    if(typeof notification === 'undefined') {
      this.notifications[data.notify_value] = {
        'notification': atom.notifications.addInfo(data.text),
        'detail': null
      }
      notification = this.notifications[data.notify_value]
      const notificationView = atom.views.getView(notification['notification']).element
      notification['detail'] = notificationView.querySelector('.detail-content') || notificationView.querySelector('.content')
      notification['detail'].parentNode.style.display = 'block'
    }
    try {
        child = notification['detail'].lastChild
        if(data.type == 'notify/echo') {
          if(!child || child.tagName != 'DIV') {
            child = document.createElement('div')
            notification['detail'].appendChild(child)
          }
          child.innerHTML += data.text.replace(/\n/g, "<br />")
        }
        if(data.type == 'notify/progress') {
          if(!child || child.tagName != 'SPAN') {
            child = document.createElement('span')
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
            notification['detail'].appendChild(child)
          }
          if(data.text) {
            child.firstChild.innerHTML = data.text + '&nbsp;'
          } else {
            child.firstChild.innerHTML = ''
          }
          child.lastChild.value = data.pct * 100
        }
    } catch(e) { console.log(e) }
  }
}
