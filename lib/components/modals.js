'use babel';
/** @jsx etch.dom */

import etch from 'etch';

import { YesNoButtonComponent } from './buttons.js';

export class GenericModalComponent {
  constructor(props) {
    this.props = props;

    this.btnContainerStyle = `display: flex; flex-direction: row-reverse;`

    etch.initialize(this);
  }
  update() {
    return etch.update(this);
  }
  render() {
    return (
      <div class='pros-atom3'>
        <div class='message'>{this.props.message}</div>
        <div>{this.props.dropdown || ''}</div>
        <div style={this.btnContainerStyle}>{this.props.buttons}</div>
      </div>
    );
  }
  destroy() {
    return etch.destroy(this);
  }
}

export class ConfirmModalComponent {
  constructor(props) {
    this.props = props;
    this.buttons = [
      <YesNoButtonComponent yes={true} onclick={this.props.confirm} />,
      <YesNoButtonComponent onclick={this.props.cancel} />
    ];
    etch.initialize(this);
  }
  update() {
    return etch.update(this);
  }
  render() {
    return <GenericModalComponent message={this.props.message} buttons={this.buttons} />;
  }
  destroy() {
    return etch.destroy(this);
  }
}
