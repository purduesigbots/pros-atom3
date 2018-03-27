'use babel'

import NotificationManager from './notificationManager.js'
import { getConsoleService } from '../util'

export default class MiddlewareCallbackHelper {
  defaultNotify(data) {
    this.notificationManager.handleNotification(data)
  }

  defaultLog(data) {
    options = {stack: data.trace, detail: data.message}
    if(data.level == 'ERROR' || data.level == 'CRITICAL') {
      // addFatalError will try to find what package the error came from, and it'll
      // always report it as coming from Atom core and suggest that the user open
      // an issue on atom/atom... They won't be able to help with CLI issues
      atom.notifications.addError(data.simpleMessage, options)
    } else if(data.level == 'WARNING') {
      atom.notifications.addWarning(data.simpleMessage, options)
    }
    service = getConsoleService()
    if(service) {
      if(data.level == 'INFO') {
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
