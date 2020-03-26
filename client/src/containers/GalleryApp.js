import React, {Component} from "react";
import axios from "axios";
import ImagesDisplay from "../components/ImagesDisplay";
import GalleryControls from "../components/GalleryControls";

const BASE_URL = "http://localhost:3001/photos";

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
    console.log('grayscale, dimensions, pageSize, pageNumber', grayscale, dimensions, pageSize, pageNumber)
    let result = await axios.get(BASE_URL, {
      params: {
        grayscale,
        dimensions: dimensions.map(d=>d.value),
        pageSize,
        currentPage:
        pageNumber
      }
    });

    console.log('result data', result.data)
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
      currentPageNumber: 1,
      dimensions: dims
    });
  };

  setPageSize = size => {
    this.setState({ pageSize: size });
  };

  setPageNumber = num => {
    debugger;
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
        <button onClick={this.loadImages}>reload</button>
        <ImagesDisplay images={images} />
        <Controls />
      </div>
    );
  }
}

const styles = {
  galleryApp: {
    border: "1px solid red"
  }
};
GalleryApp.propTypes = {};

export default GalleryApp;
