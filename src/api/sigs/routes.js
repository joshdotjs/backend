const router = require('express').Router();
const db = require('../../db/db');

const Model = require('./model');

// ==============================================

router.get('/', async (req, res) => {
  console.log('[GET] /api/sigs');
  const sigs = await Model.getAll();
  res.status(201).json( sigs );
});

// ==============================================

router.post('/', async (req, res) => {
  console.log('[POST] /api/sigs ');

  const sig = req.body;
  console.log('req.body: ', sig);

  const inserted_sig = await Model.insert( sig );
  res.status(201).json( inserted_sig );
});

// ==============================================

module.exports = router;
