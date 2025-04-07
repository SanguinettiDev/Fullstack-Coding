const express = require('express');
const router = express.Router();
const Order = require('../models/orderHistory');

// Obter todos os pedidos
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obter um pedido por ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Criar um novo pedido
router.post('/', async (req, res) => {
    const order = new Order(req.body);
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deletar um pedido
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
        res.json({ message: "Pedido deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;


