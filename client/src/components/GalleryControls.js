import React from "react";
import PropTypes from "prop-types";

import SliderWithTooltip from "./SliderWithTooltip";
import Select from "react-select";

function dimensionsToOptions(dimensions) {
    return dimensions.map(d => {
        d = Array.isArray(d) ? d[0] : d;
        const w = d.substring(0, d.indexOf("/"));
        const h = d.substring(1 + d.indexOf("/"));
        return {
            value: dimensions,
            label: `${w} x ${h}`
        }
    })
}

const sizeOptions = [
  { value: "100/100", label: "100 x 100" },
  { value: "250/250", label: "250 x 250" },
  { value: "300/200", label: "300 x 200" },
  { value: "300/300", label: "300 x 300" },
  { value: "400/200", label: "400 x 200" }
];

const GalleryControls = ({
  currentImageDimensions,
  setImageDimensions,
  currentPageSize,
  setPageSize,
  currentPageNumber,
  setPageNumber,
  currentGrayscale,
  setGrayscale,
  maxPage
}) => (
  <div style={styles.galleryControls}>
    <div style={styles.controlPad}>
      <div style={styles.controlPadTitle}>Picture Controls</div>

      <div style={styles.dimensions}>
        <div style={styles.controlPadSubtitle}>Image Size </div>
        <Select
          value={currentImageDimensions}
          onChange={setImageDimensions}
          isMulti
          name="colors"
          options={sizeOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      <div style={styles.grayScale}>
        <label htmlFor="gsBox">
            <span style={styles.controlPadSubtitle}>Grayscale Only:&nbsp;&nbsp;</span>
            <input type="checkbox" checked={currentGrayscale} onChange={setGrayscale} id="gsBox"/>
        </label>
      </div>
    </div>

    <div style={styles.controlPad}>
      <div style={styles.controlPadTitle}> Page Controls </div>
      <div style={styles.pageSize}>
        <div style={styles.controlPadSubtitle}>
          Images Per Page (Currently: {currentPageSize})
        </div>
        <SliderWithTooltip
          min={1}
          max={maxPage*currentPageSize}
          value={currentPageSize}
          handleChange={setPageSize}
        />
      </div>

      <div style={styles.pageNavigation}>
        <div style={styles.controlPadSubtitle}>
          Go To Page (Currently: {currentPageNumber} of {maxPage})
        </div>
        <SliderWithTooltip
          min={1}
          max={maxPage}
          value={currentPageNumber}
          handleChange={setPageNumber}
        />
      </div>
    </div>
  </div>
);

const styles = {
  galleryControls: {
    display: "flex",
    flexDirection: "row",
    border: "1px #e0e0e0 solid",
    justifyContent: "space-around",
    width: "80%",
    margin: "auto"
  },
  controlPad: {
    flexGrow: 1,
    border: "2px #d8d8d8 solid",
    width: "50%",
    padding: "2rem"
  },
  controlPadTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "150%"
  },
  controlPadSubtitle: {
    margin: "20px 0px 8px 5px",
    fontSize: "125%",
    fontWeight: "bolder"
  },
  dimensions: {},
  pageSize: {},
  pageNavigation: {},
  grayScale: {
    display: "flex",
    marginTop: "20px"
  }
};


GalleryControls.propTypes = {
    currentImageDimensions: PropTypes.array,
    setImageDimensions: PropTypes.func.isRequired,
    currentPageSize: PropTypes.number.isRequired,
    setPageSize: PropTypes.func.isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    setPageNumber: PropTypes.func.isRequired,
    currentGrayscale: PropTypes.bool,
    setGrayscale: PropTypes.func.isRequired,
    maxPage: PropTypes.number.isRequired,

}

export default GalleryControls;

