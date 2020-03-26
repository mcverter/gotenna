var express = require("express");
var router = express.Router();
const photosData = require("./photos-data");

router.get("/", function(req, res, next) {
  let fetchedFotos = photosData;

  let { dimensions, grayscale, pageSize, currentPage } = req.query;

  if (dimensions && dimensions.length) {
    fetchedFotos = fetchedFotos.filter(
      picUrl => dimensions.indexOf(picUrl.substring(picUrl.length - 7)) !== -1
    );
  }

  let totalDimensionImages = fetchedFotos.length;

  if (pageSize && currentPage) {
    fetchedFotos = fetchedFotos.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }

  if (grayscale === "true" || grayscale === true) {
    fetchedFotos = fetchedFotos.map(i => (i += "?grayscale"));
  }

  res.send({ images: fetchedFotos, totalImages: totalDimensionImages });
});

module.exports = router;
