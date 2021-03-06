'use babel'

import which from 'which'
import { InteractiveInputHandler } from '@purduesigbots/pros-cli-middleware'

import NotificationManager from './notificationManager.js'
import services from '../util/Services.js'
import apps from './input/interactive/applications'
import components from './input/interactive/components'

// console.log(apps);

function getzCLIExecutable() {
  return which.sync('prosv5', {nothrow: true}) || 'prosv5';
}

/**
 * Wrap calls to CLI with zCLIjs to add all of our callbacks for handling
 * things like notifications, logging, interactive UI
 */
function zCLIjs(middlewareFunction, callbacks, ...args) {
  _f = () => {
    helper = new MiddlewareCallbackHelper(callbacks)
    inputCleanup = helper.inputHandler.destroyAll.bind(helper.inputHandler)
    const promise = middlewareFunction(helper, ...args)
    promise.then(inputCleanup, (reason) => {
      inputCleanup()
      helper.rejectCallback(reason)
    })
    return promise
  }
  let promise
  if(services.getBusySignalService()) {
    promise = services.getBusySignalService().reportBusyWhile(callbacks.label || `PROS ${middlewareFunction.name}`, _f)
  } else {
    promise = _f()
  }
  return promise
}

/**
 * Object containing pros-cli-middleware expected callback functions that tie
 * whatever facility is appropriate in Atom
 */
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
      if (data.level == 'ERROR' || data.level == 'CRITICAL') {
        cons.error(data.message)
      } else if(data.level == 'INFO') {
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

  rejectCallback(reason) {
    console.error(reason)
    cons = services.getConsoleService()
    if (cons) {
      cons.error(reason.toString())
    }
    atom.notifications.addError(reason.toString())
  }

  /**
   * Create a callback object
   *
   * @param notify - Override the default behavior for displaying notifications to user
   * @param log - Override the default behavior for logging
   * @param prompt - Override the default behavior for prompting the user (deprecated?)
   * @param finalize - Override the default behavior when the CLI finalizes an action
   * @param _notify - Perform default behavior for displaying notifications, then call _notify
   * @param _log - Perform default behavior for logging, then call _log
   * @param _prompt - Perform default behavior for prompting the user, then call _prompt
   * @param _finalize - Perform default behavior for displaying CLI finalization (a Success notification), then call _finalize
   */
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
    this.inputHandler = new InteractiveInputHandler(components, apps)
    this.input = this.inputHandler.handler.bind(this.inputHandler)

    this.notificationManager = new NotificationManager()
  }
}

export default { zCLIjs, MiddlewareCallbackHelper, getzCLIExecutable };
