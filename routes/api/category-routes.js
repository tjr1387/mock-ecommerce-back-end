const router = require('express').Router();
const { Category, Product } = require('../../models');

// find [READ] all categories, with assoc. products
router.get('/', async (req, res) => {
    try {
        const ctgyData = await Category.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(ctgyData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// find [READ] one category by ID, with assoc. products
router.get('/:id', async (req, res) => {
    try {
        const ctgyData = await Category.findByPk(req.params.id, {
            include: [{ model: Product }],
        });
        if (!ctgyData) {
            res.status(404).json({ message: 'No category found with the requested ID' });
            return;
        }
        res.status(200).json(ctgyData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new category
router.post('/', async (req, res) => {
    try {
        const newCtgy = await Category.create({
            category_name: req.body.category_name,
        });
        res.status(200).json(newCtgy);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a category by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCtgy = await Category.update({
            category_name: req.body.category_name,
        },
        {
            where: {
                id: req.params.id,
            },
        });
        if (!updatedCtgy) {
            res.status(404).json({ message: 'No category found with the requested ID' });
            return;
        }
        res.status(200).json(updatedCtgy);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
    try {
        const delCtgy = await Category.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!delCtgy) {
            res.status(404).json({ message: 'No category found with the requested ID' });
            return;
        }
        res.status(200).json(delCtgy);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
