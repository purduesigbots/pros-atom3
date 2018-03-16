// XX: okay clearly i don't understand something here

'use babel'

export default class NotifyProgressHelper {
  constructor(name, id, message) {
    this.name = name
    this.id = id
    this.message = message

    const notif = atom.notifications.addInfo(this.message, {dismissable: true})
    const prog = document.createElement('progress')
    prog.value = 0
    prog.max = 100
    prog.style.width = '100%'
    this.update = nVal => this.prog.value = nVal * 100
    this.dispose = notif.dismiss()

    try {
      const nv = atom.views.getView(notif).element;
      const nc = nv.querySelector('.detail-view')
      if (nc) {
        nc.appendChild(prog)
      }
    } catch(e) { console.error(e) }
  }
  complete(completeMessage) {
    this.dispose()
    atom.notifications.addSuccess(completeMessage, {dismissable: true})
  }
}
