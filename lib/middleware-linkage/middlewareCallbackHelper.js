'use babel'

import NotificationManager from './notificationManager.js'

export default class MiddlewareCallbackHelper {
  defaultNotify(data) {
    this.notificationManager.handleNotification(data)
  }

  defaultLog(data) {
    console.log(data)
  }

  defaultFinalize(data) {
    atom.notifications.addSuccess(data.human)
    console.log(data)
  }

  defaultPrompt(data) {
    console.log(data)
  }

  constructor({notify, log, prompt, finalize} = {}) {
    this.notify = notify || this.defaultNotify
    this.log = log || this.defaultLog
    this.prompt = prompt || this.defaultPrompt
    this.finalize = finalize || this.defaultFinalize

    this.notificationManager = new NotificationManager()
  }
}
