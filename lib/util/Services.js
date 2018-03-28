'use babel'

import { Disposable } from 'atom'

let pros_console = null
let pros_busy_signal = null

function consumeConsole(createConsole) {
  pros_console = createConsole({id: 'pros', name: 'PROS'});
  console.log(pros_console)
  return new Disposable(() => { pros_console = null; })
}
function consumeBusySignal(busySignalService) {
  pros_busy_signal = busySignalService
}

const getConsoleService = () => pros_console
const getBusySignalService = () => pros_busy_signal

export default {getConsoleService, getBusySignalService, consumeConsole, consumeBusySignal};
