# Marketplace_NFT_ECE_DM
Une marketplace de NFT

Pour initialiser la config de l'app et le code pour le moment
- faire 'git clone'

- faire un 'npm install'

Pour la partie smart contract
- dans le terminal faire 'npx hardhat node'
- dans le terminal avant de déployer en local les smart contract faire un 'npx hardhat test' pour vérifier que tout marche comme voulu car après avoir déployé le smart contract on ne peuc plus le modifier
- dans le terminal faire 'npx hardhat run src/backend/scripts/deploy.js --network localhost' on déploiera les smart contract sur la blockchain du réseau de test Goerli après

- dans le browser dans l'extension metamask appuyé sur la barre avec les noms de réseau faire ajouter un réseau en bas et mettre comme info: 
- Nom du réseau: Hardhat Node
- URL de RPC: http://127.0.0.1:8545
- ID de chaîne: 31337
- Symbole de la devise: GO
- puis enregistrer 
- c'est pour l'instant avant qu'on mette en ligne les contracts 

- Dans le terminal où on a exécuter la commande 'npx hardhat node' récupérer les privates keys des deux premier compte (#0 et #1), puis aller dans metamask, appuyer sur le cercle de ton profil et faire 'importer un compte', le faire pour les deux premiers compte donc après t'as trois compte sur ton metamask logiquement

Pour la partie site
- me demander les vars à mettre dans le fichier .env.local à rajouter en local pour utiliser ipfs avec l'api pinata 

- faire un 'npm run start' dans un autre terminal pour lancer le site en local