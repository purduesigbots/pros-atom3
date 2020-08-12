'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class Logo {
  constructor(props) {
    this.props = props

    etch.initialize(this)
  }
  update() {
    return etch.update(this)
  }
  render() {
    return (
        <svg viewBox='0 0 89 89.6'>
        <polygon points='73.4 37.6 88.6 50.7 44.4 89.2 44.4 89.1 44.4 89.2 0.4 50.9 15.7 37.7 44.5 79.9 ' style={
    { fill: '#E7BC70' }}/>
        <polygon points='44.5 89.1 88.6 50.7 73.4 37.6 44.5 79.9 ' style={{fill: '#E7BC70'}}/>
        <polygon points='81.9 21.6 44.5 76.5 7.1 21.6 44.5 0.4 ' style={
    { fill: '#E7BC70' }}/>
        <path d='M44.5 76.4l37.3-54.8 -6 8.6H44.5V76.4zM56.5 52.9l-0.3-19.6 19.4-2.8L56.5 52.9z' style={{fill: '#E7BC70'}}/>
        <polygon points='44.5 0.4 44.5 10.7 47.4 12.1 47.4 15 44.5 16.5 44.5 21.6 81.9 21.6 ' style={
    { fill: '#E7BC70' }}/>
        <polygon points='81.9 21.6 44.5 67.7 7.1 21.6 44.5 4.8 ' style={{fill: '#060500'}}/>
        <polygon points='44.5 4.8 44.5 4.8 44.5 67.6 44.5 67.7 81.9 21.6 ' style={
    { fill: '#2F2D29' }}/>
        <polygon points='13.1 30.3 75.8 30.3 81.9 21.6 7.1 21.6 ' style={{fill: '#E7BC70'}}/>
        <polygon points='44.5 21.6 44.5 30.3 75.8 30.3 81.9 21.6 ' style={
    { fill: '#E7BC70' }}/>
        <polygon points='65.6 25.9 23.4 25.9 20.4 21.5 68.5 21.5 ' style={{fill: '#060500'}}/>
        <polygon points='44.5 21.5 44.5 25.9 65.6 25.9 68.6 21.5 ' style={
    { fill: '#2F2D29' }}/>
        <polygon points='22.5 24.4 23.4 25.9 65.6 25.9 66.5 24.4 ' style={{fill: '#7E868C'}}/>
        <circle cx='44.5' cy='33.7' r='1.2' style={
    { fill: '#7E868C' }}/>
        <circle cx='44.5' cy='38.8' r='1.2' style={{fill: '#7E868C'}}/>
        <circle cx='44.5' cy='43.8' r='1.2' style={
    { fill: '#7E868C' }}/>
        <polygon points='32.5 52.7 32.7 33.2 13.3 30.3 ' style={{fill: '#E7BC70'}}/>
        <polygon points='32.5 52.7 27.5 38.2 13.3 30.3 ' style={
    { fill: '#060500' }}/>
        <polygon points='56.5 52.9 56.2 33.2 75.6 30.4 ' style={{fill: '#E7BC70'}}/>
        <polygon points='56.2 33.2 56.5 52.9 75.6 30.4 ' style={
    { fill: '#E7BC70' }}/>
        <polygon points='56.5 52.9 61.6 38.2 75.6 30.4 ' style={{fill: '#2F2D29'}}/>
        <polygon points='47.4 15 44.5 16.5 41.5 15 41.5 12.1 44.5 10.7 47.4 12.1 ' style={
    { fill: '#E7BC70' }}/>
        <polygon points='44.5 10.7 44.5 16.5 47.4 15 47.4 12.1 ' style={{fill: '#E7BC70'}}/>
        <path d='M45.2 70.8c0 0.3-0.3 0.6-0.6 0.6h-0.3c-0.3 0-0.6-0.3-0.6-0.6v-22.3c0-0.3 0.3-0.6 0.6-0.6h0.3c0.3 0 0.6 0.3 0.6 0.6V70.8z' style={
    { fill: '#7E868C' }}/>
        </svg>
    );
  }
  destroy() {
    return etch.destroy(this)
  }
}
