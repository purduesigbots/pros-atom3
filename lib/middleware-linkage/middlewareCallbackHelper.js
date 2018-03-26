'use babel'

import NotificationManager from './notificationManager.js'
import { getConsoleService } from '../util'

export default class MiddlewareCallbackHelper {
  defaultNotify(data) {
    this.notificationManager.handleNotification(data)
  }

  defaultLog(data) {
    console.log(data)
    service = getConsoleService()
    if(service) {
      if(data.level == 'WARNING') {
        service.warn(data.message)
      } else if(data.level == 'ERROR' || data.level == 'CRITICAL') {
        service.error(data.message)
      } else if(data.level == 'INFO') {
        service.info(data.message)
      } else {
        service.log(data.message)
      }
    }
  }

  defaultFinalize(data) {
    atom.notifications.addSuccess(data.human)
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
