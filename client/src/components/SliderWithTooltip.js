import React from "react";
import PropTypes from "prop-types";

import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const SliderWithTooltip = ({ min, max, handleChange, value }) => {
  return (
    <div>
      <Slider
        min={min}
        max={max}
        value={value}
        handle={handle}
        onChange={handleChange}
        marks
      />
    </div>
  );
};

SliderWithTooltip.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.number
}

export default SliderWithTooltip;
