const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


// GET all tags, with assoc. products
router.get('/', async (req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: [{ model: Product, through: ProductTag, as: 'products' }],
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one tag by ID, with assoc. products
router.get('/:id', async (req, res) => {
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [{ model: Product, through: ProductTag, as: 'products' }],
        });
        if (!tagData) {
            res.status(404).json({ message: 'No tag found with the requested ID' });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new tag
router.post('/', async (req, res) => {
    try {
        const newTag = await Tag.create({
            tag_name: req.body.tag_name,
        });
        res.status(200).json(newTag);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a tag by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedTag = await Tag.update({
            tag_name: req.body.tag_name,
        },
        {
            where: {
                id: req.params.id,
            },
        });
        if (!updatedTag) {
            res.status(404).json({ message: 'No tag found with the requested ID' });
            return;
        }
        res.status(200).json(updatedTag);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a tag by ID
router.delete('/:id', async (req, res) => {
    try {
        const delTag = await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!delTag) {
            res.status(404).json({ message: 'No tag found with the requested ID' });
            return;
        }
        res.status(200).json(delTag);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
