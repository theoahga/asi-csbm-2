# Microservice Chat

Le **Microservice Chat** est un service Node.js qui interagit avec le microservice WebSocket pour envoyer des messages aux utilisateurs connectés ou diffuser des messages à tous les utilisateurs.

---

## Fonctionnalités

- **Envoyer un message à un utilisateur spécifique** via son `user_id`.
- **Diffuser un message** à tous les utilisateurs connectés.
- **Facilement extensible** grâce à une architecture modulaire.

## Lancement du Microservice

Pour démarrer le microservice, exécutez :

```bash
npm start
```

Le serveur sera accessible à l'adresse : [http://localhost:4000](http://localhost:4000).

Pour le mode développement (avec redémarrages automatiques) :

```bash
npm run dev
```

---

## Utilisation

### Endpoints REST

#### 1. **Envoyer un message à un utilisateur spécifique**

- **Méthode** : `POST`
- **URL** : `/api/chat/:user_id/:sender_id/message`
- **Corps de la requête** :

  ```json
  {
    "message": "Hello, user!"
  }
  ```

**Exemple :**

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"message":"Hello user123"}' \
http://localhost:4000/api/chat/user123/message
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

#### 2. **Diffuser un message à tous les utilisateurs connectés**

- **Méthode** : `POST`
- **URL** : `/api/chat/broadcast`
- **Corps de la requête** :

  ```json
  {
    "message": "Hello everyone!"
  }
  ```

**Exemple :**

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"message":"Hello everyone!"}' \
http://localhost:4000/api/chat/broadcast
```

**Réponse** :

```json
{
  "status": "Message broadcasted"
}
```

---

#### 3. **Récupérer l'historique d'une conversation**

- **Méthode** : `GET`
- **URL** : `/api/chat/history/:sender_id/:receiver_id`

**Exemple :**

```bash
curl -X GET -H "Content-Type: application/json" \
-d '{"message":"Hello everyone!"}' \
http://localhost:4000/api/chat/history/1/2
```

**Réponse** :

```json
[
  {
    "id": 1,
    "receiver": {
      "id": 1,
      "login": "testUser",
      "pwd": "securePassword123",
      "account": 1500.75,
      "lastName": "Doe",
      "surName": "John",
      "email": "john.doe@example.com",
      "cardList": []
    },
    "sender": {
      "id": 1,
      "login": "testUser",
      "pwd": "securePassword123",
      "account": 1500.75,
      "lastName": "Doe",
      "surName": "John",
      "email": "john.doe@example.com",
      "cardList": []
    },
    "content": "Test content example.",
    "creationDate": "2024-11-25",
    "lastModifiedDate": "2024-11-25"
  }
]
```

---

## Structure du Projet

```plaintext
microservice-chat/
├── src/
│   ├── app.js               # Point d'entrée
│   ├── controllers/
│   │   ├── ChatController.js # Gestion des messages
│   ├── services/
│   │   ├── ChatService.js    # Communication avec le microservice WebSocket
│   ├── routes/
│   │   ├── chatRoutes.js     # Définition des routes
├── package.json
├── .env                     # Configuration
└── README.md
```
