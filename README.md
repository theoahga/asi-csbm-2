# asi-csbm-2

# Sommaire

1. [Atelier 2](#atelier-2)
1. [Atelier 3](#atelier-3)

## Atelier 2

### Avantages de Node.js pour une interface de jeux et un chat entre utilisateurs :

- **Traitement en temps réel :** Node.js est idéal pour les applications en temps réel comme les jeux en ligne et le chat, grâce à son modèle d'événements et à son architecture non-bloquante. Cela permet de gérer de multiples connexions simultanées de manière fluide, ce qui est essentiel pour des fonctionnalités telles que celle demandée (chat instantané).

- **Écosystème riche et extensible :** Node.js dispose d’une vaste collection de bibliothèques et de modules, tels que Socket.IO pour les communications en temps réel, ce qui facilite l'implémentation de fonctionnalités de chat et de jeux interactifs.

- **Facilité d'intégration des WebSockets :** Node.js supporte naturellement les WebSockets, permettant de maintenir des connexions bidirectionnelles ouvertes entre le serveur et les clients pour des mises à jour en temps réel.

- **Facilité du langage :** Grâce à JavaScript, Node.js est accessible aux développeurs familiarisés avec le développement web, surtout côté client.


### Inconvénients de Node.js pour une interface de jeux et un chat entre utilisateurs :

- **Problèmes de traitement intensif :** Node.js est principalement orienté vers des opérations I/O (entrée/sortie) et peut rencontrer des limitations pour le traitement intensif, comme la gestion de calculs complexes. Cela pourrait poser des problèmes si les jeux nécessitent des calculs lourds en temps réel.

- **Modèle monothreadé :** Bien que Node.js gère efficacement les opérations asynchrones, il utilise un modèle de traitement monothreadé qui pourrait créer des goulots d'étranglement si des opérations synchrones ou des traitements CPU intensifs sont nécessaires.

- **Nécessité de gestion de la concurrence :** Bien que Node.js puisse gérer un grand nombre de connexions simultanées, il faut concevoir soigneusement les fonctionnalités de concurrence.



----

## Atelier 3

### Avantages et différences des containers Docker vis-à-vis de la virtualisation classique

Les containers Docker et la virtualisation classique (VMs) sont deux technologies de virtualisation distinctes, avec des différences notables :

- **Architecture** :
    - **VMs** : Chaque machine virtuelle possède son propre système d'exploitation et noyau, géré par un hyperviseur.
    - **Docker** : Les containers partagent le noyau du système hôte et fonctionnent comme des processus isolés.

- **Performance** :
    - **VMs** : Les VMs sont plus lourdes et consomment plus de ressources (mémoire, CPU).
    - **Docker** : Les containers sont plus légers, démarrent plus vite et consomment moins de ressources.

- **Isolation** :
    - **VMs** : Isolation complète grâce à un noyau séparé pour chaque VM.
    - **Docker** : L’isolation est plus faible, car les containers partagent le noyau du système hôte.

- **Portabilité** :
    - **VMs** : Moins portables, dépendant de l’hyperviseur et du système d’exploitation.
    - **Docker** : Très portable, pouvant être exécuté sur n'importe quel système supportant Docker.

### Avantages des containers Docker :
1. **Légèreté et efficacité** : Plus rapides et moins gourmands en ressources.
2. **Portabilité** : Facile à déplacer entre différents environnements.
3. **Gestion simplifiée** : Commandes Docker simples et outils comme Docker Compose.
4. **Rapidité de déploiement** : Pas de démarrage complet de système d'exploitation.
5. **Scalabilité** : Adapté aux architectures cloud et microservices.

### Docker
Dans l'idée de démarrer seulement les services, chaque service possède son propre docker file:
Sur https://github.com/SandroSpina698/ASI-CSBM (branche atelier2):
  - back/discovery
  - back/gateway
  - back/generate-picture-ms
  - back/generate-properties
  - back/generate-text-ms
  - back/mono
  - front
    
Sur https://github.com/theoahga/asi-csbm-2 (branche main):
  -  microservice-chat
  -  microservice-game
  -  microservice-logging
  -  microservice-websocket
