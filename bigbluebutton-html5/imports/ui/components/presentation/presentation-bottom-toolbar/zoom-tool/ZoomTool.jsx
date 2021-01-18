import React, { PureComponent } from 'react';

import { IconButton } from '/imports/ui/components/common';
import HoldButton from './holdButton/component';

const DELAY_MILLISECONDS = 200;
const STEP_TIME = 100;

class ZoomTool extends PureComponent {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.execInterval = this.execInterval.bind(this);
    this.onChanger = this.onChanger.bind(this);
    this.setInt = 0;
    this.state = {
      stateZoomValue: props.zoomValue,
      initialstateZoomValue: props.zoomValue,
      mouseHolding: false,
    };
  }

  componentDidUpdate() {
    const { zoomValue } = this.props;
    const { stateZoomValue } = this.state;
    const isDifferent = zoomValue !== stateZoomValue;
    if (isDifferent) this.onChanger(zoomValue);
  }

  onChanger(value) {
    const {
      maxBound,
      minBound,
      change,
      zoomValue,
    } = this.props;

    const { stateZoomValue } = this.state;

    let newValue = value;
    const isDifferent = newValue !== stateZoomValue;

    if (newValue <= minBound) {
      newValue = minBound;
    } else if (newValue >= maxBound) {
      newValue = maxBound;
    }

    const propsIsDifferente = zoomValue !== newValue;

    if (isDifferent && propsIsDifferente) {
      this.setState({ stateZoomValue: newValue }, () => {
        change(newValue);
      });
    }

    if (isDifferent && !propsIsDifferente) this.setState({ stateZoomValue: newValue });
  }

  increment() {
    const {
      step,
    } = this.props;

    const { stateZoomValue } = this.state;
    const increaseZoom = stateZoomValue + step;
    this.onChanger(increaseZoom);
  }

  decrement() {
    const {
      step,
    } = this.props;

    const { stateZoomValue } = this.state;
    const decreaseZoom = stateZoomValue - step;
    this.onChanger(decreaseZoom);
  }

  execInterval(inc) {
    const { mouseHolding } = this.state;
    const exec = inc ? this.increment : this.decrement;

    const interval = () => {
      clearInterval(this.setInt);
      this.setInt = setInterval(exec, STEP_TIME);
    };

    setTimeout(() => {
      if (mouseHolding) {
        interval();
      }
    }, DELAY_MILLISECONDS);
  }

  mouseDownHandler(bool) {
    this.setState({
      mouseHolding: true,
    }, () => {
      this.execInterval(bool);
    });
  }

  mouseUpHandler() {
    this.setState({
      mouseHolding: false,
    }, () => clearInterval(this.setInt));
  }

  resetZoom() {
    const { stateZoomValue, initialstateZoomValue } = this.state;
    if (stateZoomValue !== initialstateZoomValue) this.onChanger(initialstateZoomValue);
  }

  render() {
    const {
      zoomValue,
      minBound,
      maxBound,
      isMeteorConnected,
    } = this.props;

    return (
      [
        (
          <HoldButton
            key="zoom-tool-1"
            exec={this.decrement}
            value={zoomValue}
            minBound={minBound}
          >
            <IconButton
              size="sm"
              icon="bi-dash"
              onClick={() => { }}
              disabled={(zoomValue <= minBound) || !isMeteorConnected}
            />
          </HoldButton>
        ),
        (
          <HoldButton
            key="zoom-tool-3"
            exec={this.increment}
            value={zoomValue}
            maxBound={maxBound}
          >
            <IconButton
              size="sm"
              icon="bi-plus"
              noMargin
              onClick={() => { }}
              disabled={(zoomValue >= maxBound) || !isMeteorConnected}
            />
          </HoldButton>
        ),
      ]
    );
  }
}


export default ZoomTool;
