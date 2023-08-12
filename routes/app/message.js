// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../../controllers/messageController');

// Route pour envoyer un message (POST)
router.post('/messages', messageController.sendMessage);

// Route pour récupérer tous les messages associés à un receiver_num (GET)
router.get('/messages/:receiver_num', messageController.getAllMessagesByReceiverNum);

// Route pour supprimer tous les messages associés à un receiver_num (DELETE)
router.delete('/messages/:receiver_num', messageController.deleteMessagesByReceiverNum);

module.exports = router;
