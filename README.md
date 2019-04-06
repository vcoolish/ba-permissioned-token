# ba-permissioned-token
ERC20 Token implementation on Hyperledger Fabric

steps to start network and application

 install prereqs, composer, fabric etc.
 Assuming to use HLFV12 with composer v0.20.5+

 run scripts:
 /fabric-dev-servers/startFabric.sh

 /fabric-dev-servers/createPeerAdminCard.sh


 run commands: in bna folder 
    bna folder - is project folder ? 

 mkdir ./dist && composer archive create --sourceType dir --sourceName . -a ./dist/ba_token@0.0.1.bna

 composer network install -a ./dist/ba_token@0.0.1.bna -c PeerAdmin@hlfv1
 
composer network start --networkName ba_token --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file token-minter.card

composer card import --file token-minter.card

composer-rest-server -c admin@ba_token -a false
