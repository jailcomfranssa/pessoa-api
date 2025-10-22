const express = require("express");
const router = express.Router();
const controller = require("../controllers/pessoa.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Pessoa:
 *       type: object
 *       required:
 *         - nome
 *         - idade
 *         - sexo
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         nome:
 *           type: string
 *           description: Nome da pessoa
 *         idade:
 *           type: integer
 *           description: Idade da pessoa
 *         sexo:
 *           type: string
 *           description: "Sexo da pessoa (ex: 'M' ou 'F')"
 *       example:
 *         id: 1
 *         nome: João Silva
 *         idade: 30
 *         sexo: M
 */

/**
 * @swagger
 * /pessoas:
 *   get:
 *     summary: Lista todas as pessoas
 *     responses:
 *       200:
 *         description: Lista de pessoas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pessoa'
 */
router.get("/", controller.listar);

/**
 * @swagger
 * /pessoas/{id}:
 *   get:
 *     summary: Busca uma pessoa por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pessoa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pessoa'
 *       404:
 *         description: Pessoa não encontrada
 */
router.get("/:id", controller.buscarPorId);

/**
 * @swagger
 * /pessoas:
 *   post:
 *     summary: Cria uma nova pessoa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pessoa'
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pessoa'
 *       400:
 *         description: Dados inválidos
 */
router.post("/", controller.criar);

/**
 * @swagger
 * /pessoas/{id}:
 *   put:
 *     summary: Atualiza os dados de uma pessoa existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pessoa'
 *     responses:
 *       200:
 *         description: Pessoa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pessoa'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Pessoa não encontrada
 */
router.put("/:id", controller.atualizar);

/**
 * @swagger
 * /pessoas/{id}:
 *   delete:
 *     summary: Remove uma pessoa pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pessoa removida com sucesso
 *       404:
 *         description: Pessoa não encontrada
 */
router.delete("/:id", controller.remover);

module.exports = router;
