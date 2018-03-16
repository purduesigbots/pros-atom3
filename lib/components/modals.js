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
    const {
      modalClass,
      message,
      inputElem,
      dropdownElem,
      buttons
    } = this.props;
    return (
      <div class={`pros-modal ${modalClass || ''}`}>
        <div class='message'>
          <h1>{message}</h1>
        </div>
        <div>{inputElem || ''}</div>
        <div>{dropdownElem || ''}</div>
        <div style={this.btnContainerStyle}>{buttons}</div>
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
    const {
      confirm,
      cancel
    } = this.props;
    this.buttons = [
      <YesNoButtonComponent yes={true} onclick={confirm(this)} />,
      <YesNoButtonComponent onclick={cancel(this)} />
    ];
    etch.initialize(this);
  }
  update(props) {
    if (props.message && this.props.message !== props.message) {
      this.props.message = props.message;
    }
    return etch.update(this);
  }
  render() {
    const {
      message,
      modalClass
    } = this.props;
    return <GenericModalComponent message={message} buttons={this.buttons} modalClass={modalClass || null} />;
  }
  destroy() {
    return etch.destroy(this);
  }
}
