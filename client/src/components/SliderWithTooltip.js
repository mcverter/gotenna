import React from "react";
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
  const handleValueChange = e => {
    value: e;
  };

  return (
    <div>
      <Slider
        min={0}
        max={50}
        value={value}
        handle={handle}
        onChange={handleChange}
      />
    </div>
  );
};

export default SliderWithTooltip;
