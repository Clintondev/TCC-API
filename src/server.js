const express = require('express');
const bodyParser = require('body-parser');
const swaggerSetup = require('./swagger');

const app = express();
app.use(bodyParser.json());

let items = [];

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do item
 *         name:
 *           type: string
 *           description: Nome do item
 *       example:
 *         id: 1
 *         name: "Exemplo de Item"
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Gerenciamento de itens
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retorna a lista de itens
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Lista de itens.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
app.get('/items', (req, res) => {
    res.json(items);
});

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Adiciona um novo item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Nome do item é obrigatório.
 */
app.post('/items', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Item name is required' });
    }
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Busca um item pelo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item não encontrado.
 */
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id, 10));
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
});

swaggerSetup(app);

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} else {
    module.exports = app; 
}