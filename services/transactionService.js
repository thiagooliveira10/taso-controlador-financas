const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findAll = async (req, res) => {
  const { period } = req.query;
  try{
    if(period != null){
      const transactions = await TransactionModel.find({yearMonth: period});

      res.send(transactions);
    }else{
      res.send('E necessario informar o parametro "period", cujo o valor deve estar no formato yyyy-mm');
    }
  }catch(err){
    res.status(500).send(err);
  }
};

const search = async (req, res) =>{
  const {description } = req.query;

  try{
    var condition = description
    ? { description: { $regex: new RegExp(description), $options: 'i' } }
    : {};

    const transactions = await TransactionModel.find(condition);

  res.send(transactions);

  }catch(err){
    res.status(500).send(err);
  }
 
}

const findOne = async (req, res) => {
  const id = req.query.id;

  try{
    const data = await TransactionModel.findById({ _id: id });
    if (data.length < 1) {
      res.status(404)
        .send({ message: 'Nenhuma transação encontrada com o id:' + id });
    } else {
      res.send(data);
    }
  }catch(error){
    res.status(500).send({ message: 'Erro ao buscar a transação id: ' + id });
  }
}

const create = async (req, res) => {
  const transaction = new TransactionModel(req.body);
  try {
    await transaction.save();
    res.send(transaction);
  } catch (err) {
    res.status(500).send(err);
  }
}

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados da transação vazios',
    });
  }

  const id = req.query.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: 'Nenhuma transação encontrada para atualizar' });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a transação id: ' + id });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await TransactionModel.findOneAndDelete({ _id: id });
    console.log(transaction);

    if (!transaction) {
      res.status(404).send('Transação não encontrada');
    }

    res.status(200).send('Transação removida com sucesso!');
  } catch (err) {
    res.status(500).send(err);
  }
};

const getPeriods = async (req, res) => {

  try{
    const periods = await TransactionModel.find({}).distinct('yearMonth');
    res.send(periods);
  }catch(err){
    res.status(500).send(err);
  }
  
}

module.exports = { findAll, findOne, search, create, remove, update, getPeriods}