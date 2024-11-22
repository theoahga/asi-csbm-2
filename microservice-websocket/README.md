# Microservice WebSocket avec Node.js

Ce microservice gère les connexions WebSocket des utilisateurs et expose une API REST pour permettre à d'autres services d'interagir avec eux via leurs sockets. Il est conçu en utilisant **Node.js**, **Express.js**, et **Socket.IO**, en suivant une architecture orientée objet pour la modularité et l'extensibilité.

---

## Fonctionnalités

- **Gestion des connexions WebSocket** : Enregistrer, suivre et déconnecter les utilisateurs en temps réel.
- **Endpoints REST** :
    - Obtenir la liste des utilisateurs connectés.
    - Envoyer un message à un utilisateur spécifique.
    - Diffuser un message à tous les utilisateurs connectés.

---

## Utilisation

### 1. **Connexion WebSocket**

Connectez-vous au serveur via un client WebSocket :

```javascript
const socket = io('http://localhost:3000');
socket.emit('register', 'user123'); // Enregistrer l'utilisateur avec l'ID 'user123'
```

---

### 2. **Endpoints REST**

#### a. **Liste des utilisateurs connectés**

- **Méthode** : `GET`
- **URL** : `/api/users`

**Exemple** :

```bash
curl http://localhost:3000/api/users
```

**Réponse** :

```json
{
  "users": ["user123", "user456"]
}
```

---

#### b. **Envoyer un message à un utilisateur spécifique**

- **Méthode** : `POST`
- **URL** : `/api/users/:user_id/message`
- **Corps de la requête** :

```json
{
  "message": "Hello, user123!"
}
```

**Exemple** :

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"message":"Hello, user123!"}' \
http://localhost:3000/api/users/user123/message
```

**Réponse (succès)** :

```json
{
  "status": "Message sent"
}
```

**Réponse (échec)** :

```json
{
  "error": "User not connected"
}
```

---

#### c. **Diffuser un message à tous les utilisateurs connectés**

- **Méthode** : `POST`
- **URL** : `/api/users/broadcast`
- **Corps de la requête** :

```json
{
  "message": "Hello, everyone!"
}
```

**Exemple** :

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"message":"Hello, everyone!"}' \
http://localhost:3000/api/users/broadcast
```

**Réponse** :

```json
{
  "status": "Message broadcasted"
}
```

---

## Structure du Projet

```plaintext
microservice/
├── src/
│   ├── app.js                # Point d'entrée
│   ├── controllers/
│   │   ├── UserController.js # Contrôleur pour les endpoints REST
│   ├── services/
│   │   ├── SocketService.js  # Gestion des WebSockets
│   ├── routes/
│   │   ├── userRoutes.js     # Définition des routes
├── package.json
├── .env
└── README.md
```

---
