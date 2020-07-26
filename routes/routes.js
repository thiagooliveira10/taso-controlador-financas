const express = require('express');
const transactionRouter = express.Router();

const {
  findAll,
  create,
  remove,
  update,
  findOne,
  search,
  getPeriods,
} = require('../services/transactionService');

transactionRouter.get('/', findAll);
transactionRouter.get('/find', findOne);
transactionRouter.get('/search', search)
transactionRouter.post('/', create);
transactionRouter.put('/', update);
transactionRouter.delete('/:id', remove);
transactionRouter.get('/periods', getPeriods);

module.exports = transactionRouter;
