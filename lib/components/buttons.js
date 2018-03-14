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
    const {
      isPrimary,
      isDefault,
      iconClass,
      onclick,
      text
    } = this.props;
    const btnClass = `${isPrimary ? 'btn btn-primary' : isDefault ? 'btn btn-default' : 'btn'} ${iconClass || ''}`;
    return <button class={btnClass} onclick={onclick}>{text || ''}</button>;
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
    const {
      yes,
      onclick,
      confirmText
    } = this.props;
    return (
      <GenericButtonComponent
        isPrimary={yes}
        iconClass={yes ? 'icon icon-rocket' : ''}
        onclick={onclick}
        text={yes ? (confirmText || 'OK') : 'Cancel'} />
    );
  }
  destroy() {
    return etch.destroy(this);
  }
}
