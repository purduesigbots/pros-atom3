'use babel'

import which from 'which'
import { createInteractiveInputHandler } from '@purduesigbots/pros-cli-middleware'

import NotificationManager from './notificationManager.js'
import services from '../util/Services.js'
import apps from './input/interactive/applications'
import components from './input/interactive/components'

console.log(apps);

function getzCLIExecutable() {
  return which.sync('prosv5', {nothrow: true}) || 'prosv5';
}

function zCLIjs(middlewareFunction, callbacks, ...args) {
  _f = () => {
    return middlewareFunction(new MiddlewareCallbackHelper(callbacks), ...args)
  }
  let promise
  if(services.getBusySignalService()) {
    promise = services.getBusySignalService().reportBusyWhile(callbacks.label || `PROS ${middlewareFunction.name}`, _f)
  } else {
    promise = _f()
  }
  return promise;
}

class MiddlewareCallbackHelper {
  defaultNotify({d: data}) {
    this.notificationManager.handleNotification(data)
  }

  defaultLog({d: data}) {
    options = {stack: data.trace, detail: data.message}
    if(data.level == 'ERROR' || data.level == 'CRITICAL') {
      // addFatalError will try to find what package the error came from, and it'll
      // always report it as coming from Atom core and suggest that the user open
      // an issue on atom/atom... They won't be able to help with CLI issues
      atom.notifications.addError(data.simpleMessage, options)
    } else if(data.level == 'WARNING') {
      atom.notifications.addWarning(data.simpleMessage, options)
    }
    cons = services.getConsoleService()
    if(cons) {
      if(data.level == 'INFO') {
        cons.info(data.message)
      } else {
        cons.log(data.message)
      }
    }
  }

  defaultFinalize({d: data}) {
    atom.notifications.addSuccess(data.human)
  }

  defaultPrompt({d: data}) {
    console.log(data)
  }

  constructor({notify, log, prompt, finalize, _notify, _log, _prompt, _finalize} = {}) {
    let follow = (a, b) => {
      if(a && b) return ((data) => { a(data); b(data); })
      if(a && !b) return a
      if(!a && b) return b
      return () => {}
    }
    this.notify = notify || follow(this.defaultNotify.bind(this), _notify)
    this.log = log || follow(this.defaultLog.bind(this), _log)
    this.prompt = prompt || follow(this.defaultPrompt.bind(this), _prompt)
    this.finalize = finalize || follow(this.defaultFinalize.bind(this), _finalize)
    this.input = createInteractiveInputHandler(components, apps);

    this.notificationManager = new NotificationManager()
  }
}

export default { zCLIjs, MiddlewareCallbackHelper, getzCLIExecutable };
