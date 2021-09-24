const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET route for all categories
router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route for a single category
router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
     
    if (!catData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new category
router.post('/', async (req, res) => {
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);

  } catch (err) {

    res.status(400).json(err);
  }
});

// Route to update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const catData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!catData) {
      res.status(404).json({ message: 'No Category found with this id' });
      return;
    }

    res.status(200).json(catData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy ({
      where: {
        id: req.params.id,
      },
    });
    if (!catData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(catData);

  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
