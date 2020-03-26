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
      alt="stock gallery image"
      src={src}
      height={getHeight(src)}
      width={getWidth(src)}
    />
  );
};

const ImagesDisplay = ({ images }) => {
  if (!images || !images.length) {
    return <div>Press Button Below to Load Images</div>;
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
    alignItems: "center",
    flexDirection: "row"
  },
  galleryImage: {
    maxHeight: "100vh",
    padding: "1rem",
    margin: "1rem",
    border: "1rem black solid"
  }
};

export default ImagesDisplay;
