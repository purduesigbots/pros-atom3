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
  update(props) {
    if (props.message && this.props.message !== props.message) {
      this.props.message = props.message;
    }
    return etch.update(this);
  }
  render() {
    return (
      <div class={`pros-modal ${this.props.modalClass || ''}`}>
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
      <YesNoButtonComponent yes={true} onclick={this.props.confirm(this)} />,
      <YesNoButtonComponent onclick={this.props.cancel(this)} />
    ];
    etch.initialize(this);
  }
  update(props) {
    console.log(props);
    if (props.message && this.props.message !== props.message) {
      console.log('updating...');
      this.props.message = props.message;
    }
    return etch.update(this);
  }
  render() {
    console.log(this.props.message);
    return <GenericModalComponent message={this.props.message} buttons={this.buttons} modalClass={this.props.modalClass || null} />;
  }
  destroy() {
    return etch.destroy(this);
  }
}
