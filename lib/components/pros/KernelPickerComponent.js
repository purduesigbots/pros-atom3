'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { listTemplates } from '@purduesigbots/pros-cli-middleware'

import { zCLIjs } from '../../middleware-linkage'

export default class KernelPickerComponent {
  constructor(props) {
    this.props = props

    this.latestOption = <option selected>latest</option>
    this.kList = [this.latestOption]
    // set up callback for updating this value
    this.handleChange = event => this.props.onChanged(event.target.value)
    this.handleTargetChange = event => {
      this._target = event.target.value
      this.props.onTargetChanged(this._target)
      // re-run query based on new selection
      this.query()
    }
    // set initial values
    this.selectedKernel = 'latest'
    this._target = 'v5'
    etch.initialize(this)

    this.query()
  }
  query() {
    zCLIjs(
      listTemplates, {
        finalize: finalData => this.dispList(finalData)
      }, 'kernel', {target: this._target}
    )
  }
  dispList(d) {
    this.kList = d.data.map(e => {
      return <option value={e.version}>{`${e.name}@${e.version} from ${e.location}`}</option>
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
        <h4>Choose a target</h4>
        <div class='select-container'>
          <select class='form-control' onChange={this.handleTargetChange}>
            <option value='v5'>V5</option>
            <option value='cortex'>Cortex</option>
          </select>
        </div>
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
