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
- **URL** : `/api/chat/:user_id/message`
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
