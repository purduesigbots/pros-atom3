'use babel'

import { Disposable } from 'atom'

let pros_console = null
let pros_busy_signal = null
let terminal_tab_create = null

function consumeConsole(createConsole) {
  pros_console = createConsole({id: 'pros', name: 'PROS'});
  console.log(pros_console)
  return new Disposable(() => { pros_console = null; })
}
function consumeBusySignal(busySignalService) {
  pros_busy_signal = busySignalService
}
function consumeTerminalTab(_createTerminalSession) {
  terminal_tab_create = _createTerminalSession
  return new Disposable(() => { terminal_tab_create = null; });
}

const getConsoleService = () => pros_console
const getBusySignalService = () => pros_busy_signal
const createTerminalTab = (...args) => {
  if(terminal_tab_create) {
    return terminal_tab_create(...args)
  }
}

export default {getConsoleService, getBusySignalService, createTerminalTab, consumeConsole, consumeBusySignal, consumeTerminalTab};
