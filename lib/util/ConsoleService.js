'use babel'

import { Disposable } from 'atom'

let _createConsole = null

export const setConsoleService = createConsole => {
  _createConsole = createConsole
  return new Disposable(() => _createConsole = null)
}

export const getConsoleService = () => _createConsole
