import React from "react";
import PropTypes from "prop-types";

const Image = ({ src }) => {
  const getWidth = src =>
    src.substring(src.lastIndexOf("/") - 3, src.lastIndexOf("/"));
  const getHeight = src =>
    src.substring(src.lastIndexOf("/") + 1, src.lastIndexOf("/") + 4);

  return (
    <img
      style={styles.galleryImage}
      alt="stock gallery photo"
      src={src}
      height={getHeight(src)}
      width={getWidth(src)}
    />
  );
};

const ImagesDisplay = ({ images }) => {
  if (!images || !images.length) {
    return <div></div>;
  } else {
    return (
      <div style={styles.galleryGrid}>
        {images.map((url, idx) => (
          <Image key={url} src={url} />
        ))}
      </div>
    );
  }
};

const styles = {
  galleryGrid: {
    display: "flex",
    flexWrap: "wrap",
    width: "80%",
    margin: "auto",
    justifyContent: "space-around"
  },
  galleryImage: {
    maxHeight: "100vh",
    padding: "1rem",
    margin: "1rem",
    border: "1rem darkgray solid"
  }
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
}

ImagesDisplay.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ImagesDisplay;
