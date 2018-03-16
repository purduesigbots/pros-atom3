// XXX: this file is dead keeping it here for a few commits for reference, esp.
//      wrt the notification handling stuff which is still TBD
// 'use babel'
// /** @jsx etch.dom */
//
// import etch from 'etch'
//
// import { createNewProject } from '@purduesigbots/pros-cli-middleware'
//
// import { NewProjectComponent } from './components/modals'
//
// const prog = document.createElement('progress')
// prog.max = 1
// prog.value = 0
// prog.style.width = '100%'
// let n
// let i
//
// const notify = data => {
//   switch (data.type.split('/')[1]) {
//     case 'echo':
//       i = atom.notifications.addInfo(data.text, {dismissable: true})
//       try {
//         const v = atom.views.getView(i)
//         const c = v.querySelector('.detail-content')
//         if (c) {
//           c.appendChild(<p>{data.text}</p>)
//         }
//       } catch (_) {}
//       break
//     case 'progress':
//       prog.value = data.pct
//       // console.log(prog)
//       n = atom.notifications.addInfo(data.label, {dismissable: true})
//       try {
//         const v = atom.views.getView(n)
//         const c = v.element.querySelector('.detail-content')
//         console.log('view:', v)
//         console.log('view.querySelector:', v.querySelector)
//         if (c) {
//           c.appendChild(prog)
//         }
//       } catch (e) { console.log('wut', e) }
//       break
//   }
// }
// const finalize = data => {
//   atom.notifications.addSuccess(`Created PROS project for ${data.data.project.target} at ${data.data.project.location}`)
// }
//
// export default class ProsAtom3View {
//   constructor(serializedState) {
//     const confirm = cmp => event => {
//       console.log(cmp.path)
//       console.log(cmp.kernel)
//       createNewProject(notify, d => console.log(d), finalize, cmp.path, cmp.kernel)
//       atom.commands.dispatch(this.getElement(), 'pros-atom3:toggle')
//     }
//     const cancel = cmp => event => {
//       console.log('cancelled!')
//       atom.commands.dispatch(this.getElement(), 'pros-atom3:toggle')
//     }
//     const modal = new NewProjectComponent({confirm: confirm, cancel: cancel})
//     this.element = modal.element
//   }
//
//   // Returns an object that can be retrieved when package is activated
//   serialize() {}
//
//   // Tear down any state and detach
//   destroy() {
//     this.element.remove()
//   }
//
//   getElement() {
//     return this.element
//   }
//
// }
