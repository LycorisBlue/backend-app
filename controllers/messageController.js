// controllers/messageController.js
const Message = require('../models/Message');

// Envoi d'un message
const sendMessage = async (req, res) => {
  const { sender_num, receiver_num, content } = req.body;

  try {
    // Créer un nouveau message dans la base de données
    const message = await Message.create({
      sender_num: sender_num,
      receiver_num: receiver_num,
      content: content,
    });

    // Réponse réussie avec le message créé
    res.status(201).json(message);
  } catch (error) {
    // Une erreur s'est produite lors de la création du message, renvoie une réponse d'erreur
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'envoi du message.' });
  }
};

// Récupération de tous les messages associés au receiver_num
const getAllMessagesByReceiverNum = async (req, res) => {
  const { receiver_num } = req.params;

  try {
    // Rechercher tous les messages associés au receiver_num dans la base de données
    const messages = await Message.findAll({
      where: {
        receiver_num: receiver_num,
      },
    });

    // Réponse réussie avec les messages récupérés
    res.status(200).json(messages);
  } catch (error) {
    // Une erreur s'est produite lors de la recherche des messages, renvoie une réponse d'erreur
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des messages.' });
  }
};

// Suppression des messages associés à un receiver_num
const deleteMessagesByReceiverNum = async (req, res) => {
  const { receiver_num } = req.params;

  try {
    // Supprimer tous les messages associés au receiver_num de la base de données
    const deletedMessages = await Message.destroy({
      where: {
        receiver_num: receiver_num,
      },
    });

    // Réponse réussie avec le nombre de messages supprimés
    res.status(200).json({ message: `${deletedMessages} messages ont été supprimés.` });
  } catch (error) {
    // Une erreur s'est produite lors de la suppression des messages, renvoie une réponse d'erreur
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression des messages.' });
  }
};

module.exports = {
  sendMessage,
  getAllMessagesByReceiverNum,
  deleteMessagesByReceiverNum,
};
