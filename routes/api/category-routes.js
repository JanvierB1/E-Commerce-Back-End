const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryAll = await Category.findAll({
      // be sure to include its associated Products

      include: [
        {
          model: Product,
          attributes: ["id", "price", "product_name", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(categoryAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryOne = await Category.findOne({
      where: {
        id: req.params.id,
      },
      // may need to use includes here
      // be sure to include its associated Products

      includes: [
        {
          model: Product,
          attributes: ["id", "price", "product_name", "stock", "category_id"],
        },
      ],
    });
    if (!categoryOne) {
      res.status(404).json({ message: "No location found with this id!" });
      return;
    }

    res.status(200).json(categoryOne);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    if (!newCategory) {
      res.status(404).json({ message: "No new category created!" });
      return;
    }

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  
});



module.exports = router;