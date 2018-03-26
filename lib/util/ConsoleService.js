'use babel'

import { Disposable } from 'atom'

let pros_console = null
export function consumeConsole(createConsole) {
  pros_console = createConsole({id: 'pros', name: 'PROS'});
  console.log(pros_console)
  return new Disposable(() => { pros_console = null; })
}

export const getConsoleService = () => pros_console
