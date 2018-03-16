'use babel'

export default class BaseView {

  constructor(serializedState, cmp) {
    this.element = cmp.element
  }

  toggle() {
    if (this.panel && this.panel.isVisible()) {
      this.hide()
    } else {
      this.show()
    }
  }

  show() {
    this.panel = this.panel || atom.workspace.addModalPanel({item: this})
    this.panel.show()
  }

  hide() {
    if (this.panel) {
      this.panel.hide()
    }
  }

  serialize() {}

  getElement() {
    return this.element
  }

  destroy() {
    this.element.remove()
  }

  static register() {
    atom.views.addViewProvider(this, m => {
      if (!(m instanceof this)) {
        m = new this
      }
      return m.getElement()
    })
  }
}
