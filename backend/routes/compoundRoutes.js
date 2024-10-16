const express = require('express');
const router = express.Router();
const Compound = require('../models/Compound');
const authMiddleware = require('../middleware/auth');


router.get('/', async (req, res) => {
  const compounds = await Compound.findAll();
  res.json(compounds);
});


router.get('/:id', async (req, res) => {
  const compound = await Compound.findByPk(req.params.id);
  if (compound) {
    res.json(compound);
  } else {
    res.status(404).json({ message: 'Compound not found' });
  }
});


router.post('/', async (req, res) => {
  const compound = await Compound.create(req.body);
  res.json(compound);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const compound = await Compound.findByPk(req.params.id);
  if (compound) {
    await compound.update(req.body);
    res.json(compound);
  } else {
    res.status(404).json({ message: 'Compound not found' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const compound = await Compound.findByPk(req.params.id);
  if (compound) {
    await compound.destroy();
    res.json({ message: 'Compound deleted' });
  } else {
    res.status(404).json({ message: 'Compound not found' });
  }
});


module.exports = router;
