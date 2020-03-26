import React, {Component} from "react";
import PropTypes from "prop-types";

import axios from "axios";
import ImagesDisplay from "../components/ImagesDisplay";
import GalleryControls from "../components/GalleryControls";

const BASE_URL = "http://localhost:8080/photos";

class GalleryApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      grayscale: false,
      pageNumber: 1,
      pageSize: 10,
      qtyImages: 0,
      dimensions: []
    };
    this.loadImages = this.loadImages.bind(this);
    this.setPageSize = this.setPageSize.bind(this);
  }

  async loadImages() {
    const { grayscale, dimensions, pageSize, pageNumber } = this.state;

    let result = await axios.get(BASE_URL, {
      params: {
        grayscale,
        dimensions: dimensions.map(d=>d.value),
        pageSize,
        currentPage:
        pageNumber
      }
    });

    this.setState({
      images: result.data.images,
      qtyImages: result.data.totalImages
    });
  }

  componentDidMount() {
    this.loadImages();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
        this.state.grayscale !== prevState.grayscale ||
        this.state.dimensions !== prevState.dimensions ||
        this.state.pageSize !== prevState.pageSize ||
        this.state.pageNumber !== prevState.pageNumber) {
      this.loadImages();
    }
  }

  setImageDimensions = dims => {
    this.setState({
      pageNumber: 1,
      dimensions: dims || []
    });
  };

  setPageSize = size => {
    this.setState({
        pageNumber: 1,
        pageSize: size
    });
  };

  setPageNumber = num => {
    this.setState({ pageNumber: num });
  };

  setGrayscale = e => {
    this.setState({ grayscale: e.target.checked });
  };

  render() {
    const { images, pageNumber, pageSize, qtyImages, dimensions, grayscale } = this.state;

    const Controls = () => (
      <GalleryControls
        currentImageDimensions={dimensions}
        setImageDimensions={this.setImageDimensions}
        currentPageSize={pageSize}
        setPageSize={this.setPageSize}
        currentPageNumber={pageNumber}
        setPageNumber={this.setPageNumber}
        currentGrayscale={grayscale}
        setGrayscale={this.setGrayscale}
        maxPage={Math.ceil(qtyImages / pageSize)}
      />
    );

    return (
      <div style={styles.galleryApp}>
        <Controls />
        <ImagesDisplay images={images} />
        <Controls />
      </div>
    );
  }
}

const styles = {
  galleryApp: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
};

GalleryApp.propTypes = {};

export default GalleryApp;
