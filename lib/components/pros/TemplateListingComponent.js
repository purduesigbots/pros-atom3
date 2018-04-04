'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class TemplateListingComponent {
  constructor(props) {
    this.props = props
    this.noop = () => {}
    this.needUpgrade = !!this.props.upgradeList.length
    if (this.needUpgrade) { // only need to set these if there is an upgrade
      this.versionList = this.props.upgradeList.map(e => <option value={e}>{e}</option>)
      this.versionList.unshift(<option value='latest'>Latest</option>)
      this.versionList.unshift(<option value='' disabled selected>Select an option</option>)
      this.versionList.push(<option value='keep'>Don't upgrade</option>)
      this.selectedVersion = this.versionList[0]
      this.handleChange = event => {
        let evtStr
        if (event.target.value === 'latest' || event.target.value === 'keep') {
          evtStr = event.target.value === 'latest' ? `${this.props.name}` : event.target.value
        } else {
          evtStr = `${this.props.name}@${event.target.value}`
        }
        this.props.onChanged(evtStr)
      }
      // this.handleChange('latest')
    }
    this.versionList = this.versionList || <option>up-to-date!</option>
    etch.initialize(this)
  }
  update() {
    return etch.update(this)
  }
  render() {
    return (
      <div class='template-listing'>
        <h5 class='label'>{this.props.name}@{this.props.currentVersion}</h5>
        <select
          class='form-control'
          onChange={this.handleChange || this.noop}
          disabled={!this.needUpgrade}>
          {this.versionList}
        </select>
      </div>
    )
  }
  destroy() {
    return etch.destroy(this)
  }
}
