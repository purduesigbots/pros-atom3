'use babel';
/** @jsx etch.dom */

import etch from 'etch';

export class GenericButtonComponent {
  constructor(props) {
    this.props = props;
    etch.initialize(this);
  }
  update() {
    return etch.update(this);
  }
  render() {
    const btnClass = `${this.props.isPrimary ? 'btn btn-primary' : this.props.isDefault ? 'btn btn-default' : 'btn'} ${this.props.iconClass || ''}`;
    return <button class={btnClass} onclick={this.props.onclick}>{this.props.text || ''}</button>;
  }
  destroy() {
    return etch.destroy(this);
  }
}

export class YesNoButtonComponent {
  constructor(props) {
    this.props = props;
    this.props.yes = !!this.props.yes || false;

    etch.initialize(this);
  }
  update() {
    return etch.update(this);
  }
  render() {
    return (
      <GenericButtonComponent
        isPrimary={this.props.yes}
        iconClass={this.props.yes ? 'icon icon-rocket' : ''}
        onclick={this.props.onclick}
        text={this.props.yes ? (this.props.confirmText || 'OK') : 'Cancel'} />
    );
  }
  destroy() {
    return etch.destroy(this);
  }
}
