'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import { listTemplates } from '@purduesigbots/pros-cli-middleware'

export default class KernelPickerComponent {
  constructor(props) {
    this.props = props

    this.latestOption = <option selected>latest</option>
    this.kList = [this.latestOption]
    // set up callback for updating this value
    this.handleChange = event => this.props.onChanged(event.target.value)

    etch.initialize(this)

    // set initial value
    this.props.onChanged(this.latestOption.domNode.value)
    listTemplates({
      notify: n => console.log(n),
      log: l => console.log(l),
      finalize: finalData => this.dispList(finalData)
    }).catch(e => console.error(e))
  }
  dispList(d) {
    this.kList = d.data.map(e => {
      return <option value={e.version}>{`${e.name}@${e.version} from ${e.location}`}></option>
    })
    this.kList.unshift(this.latestOption)
    etch.update(this)
  }
  update() {
    return etch.update(this)
  }
  render() {
    return (
      <div class='kernel-picker'>
        <h4>Choose a kernel</h4>
        <div class='select-container'>
          <select class='form-control' value={this.selectedKernel} onChange={this.handleChange}>
            {this.kList || ''}
          </select>
        </div>
      </div>
    )
  }
  destroy() {
    return etch.destroy(this)
  }
}
