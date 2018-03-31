const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Matches with "/api/articles"
router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(articlesController.findById)
  .delete(articlesController.remove);

// Matches with "/api/articles/:search"
router
  .route("/:search")
  .get(articlesController.findById);

module.exports = router;