'use babel'

export default class NotificationManager {
  constructor() {
    this.notifications = {}
  }

  get(idx) {
    return this.notifications[idx.toString()]
  }

  handleNotification(data) {
    console.log(data)
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
          console.log(`Appending ${data.text}`)
          if(!child || child.tagName != 'DIV') {
            child = document.createElement('div')
            notification['detail'].appendChild(child)
          }
          child.innerHTML += data.text.replace(/\n/g, "<br />")
        }
        if(data.type == 'notify/progress') {
          if(!child || child.tagName != 'PROGRESS') {
            child = document.createElement('progress')
            child.max = 100
            child.style.width = '100%'
            notification['detail'].appendChild(child)
          }
          child.value = data.pct * 100
        }
    } catch(_) { }
  }
}
