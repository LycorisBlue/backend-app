// controllers/userController.js
const User = require('../models/User');


// Fonction de connexion
const loginUser = async (req, res) => {
    const { numero, pass } = req.body;
  
    try {
      // Vérifie si un utilisateur avec le numéro fourni existe dans la table "users"
      const user = await User.findOne({
        where: {
          numero: numero,
        },
      });
  
      if (!user) {
        // L'utilisateur n'existe pas, renvoie une réponse d'erreur
        res.status(404).json({ message: 'Numéro non trouvé.' });
      } else if (user.pass !== pass) {
        // Le mot de passe ne correspond pas au numéro trouvé, renvoie une réponse d'erreur
        res.status(401).json({ message: 'Mot de passe incorrect.' });
      } else {
        // L'utilisateur existe et le mot de passe correspond, renvoie toutes les données de l'utilisateur au format JSON
        res.status(200).json(user);
      }
    } catch (error) {
      // Une erreur s'est produite lors de la recherche de l'utilisateur, renvoie une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
    }
  };
  

// Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
  }
};

// Récupérer un utilisateur par son ID
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
  }
};

// Récupérer un utilisateur par son numéro de téléphone
const getUserByNumero = async (req, res) => {
    const { numero } = req.params;
  
    try {
      const user = await User.findOne({
        where: {
          numero: numero,
        },
      });
  
      if (user) {
        // L'utilisateur a été trouvé, renvoyer les informations de l'utilisateur
        res.status(200).json(user);
      } else {
        // L'utilisateur n'existe pas, renvoyer une réponse d'erreur
        res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
    } catch (error) {
      // Une erreur s'est produite lors de la recherche de l'utilisateur, renvoyer une réponse d'erreur
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
    }
  };


// Créer un nouvel utilisateur
const createUser = async (req, res) => {
  const { name, lastname, numero, pass } = req.body;

  try {
    // Vérifier si le numéro existe déjà dans la base de données
    const existingUser = await User.findOne({ where: { numero } });

    if (existingUser) {
      // Si le numéro existe déjà, renvoyer une réponse d'erreur
      return res.status(409).json({ message: 'Ce numéro d\'utilisateur existe déjà.' });
    }

    // Si le numéro n'existe pas, créer le nouvel utilisateur
    const newUser = await User.create({ name, lastname, numero, pass });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
  }
};


// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { nom, prenom, numero, password } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    await user.update({ nom, prenom, numero, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.' });
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserByNumero
};
