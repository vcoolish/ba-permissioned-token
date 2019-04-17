# ba_timetracker

BNA timetracker

steps to start network and application

 install prereqs, composer, fabric etc.
 Assuming to use HLFV12 with composer v0.20.5+

 ### run fabric scripts from User root:
    ./fabric-dev-servers/startFabric.sh

    ./fabric-dev-servers/createPeerAdminCard.sh

### run composer scripts from project root:
 run commands: in bna folder 
    bna folder - is project folder (ba_timetracker) 

    mkdir ./dist && composer archive create --sourceType dir --sourceName . -a ./dist/ba_timetracker@0.0.1.bna

    composer network install -a ./dist/ba_timetracker@0.0.1.bna -c PeerAdmin@hlfv1
 
    composer network start --networkName ba_timetracker --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file token-admin.card

    composer card import --file token-admin.card

    composer-rest-server -c admin@ba_timetracker -a false

### Create Participant instance

    composer participant add -c admin@ba_timetracker -d '{"$class":"ba_timetracker.models.participants.Director","id":"DirectorUsers","info":{"$class":"ba_timetracker.models.participants.EmployeeInfo","firstName":"Jon","lastName":"Smith"}}'

    composer participant add -c admin@ba_timetracker -d '{"$class":"ba_timetracker.models.participants.Employee","id":"timeHolder1","info":{"$class":"ba_timetracker.models.participants.EmployeeInfo","firstName":"Sergii","lastName":"Test"}}'

### Identity. For instance participent create indentity card 

    composer identity issue -u DirectorUsers -a ba_timetracker.models.participants.Director#DirectorUsers -c admin@ba_timetracker -x          

    composer identity issue -u timeHolder1 -a ba_timetracker.models.participants.Employee#timeHolder1 -c admin@ba_timetracker


### Import card to network
    composer card import --file DirectorUsers@ba_timetracker.card
    composer card import --file timeHolder1@ba_timetracker.card

### Start rest server from Identity (user) 
before start stop your previus  composer-rest-server !important
    composer-rest-server -c DirectorUsers@ba_timetracker -a false
    composer-rest-server -c timeHolder1@ba_timetracker -a false

### Create time entry  rest-server
open brouser http://localhost:3000/explorer 

select ba_timetracker_models_assets_AssetTimeEntry

then select POST /ba_timetracker.models.assets.AssetTimeEntry

insert in data valid json: (change id )

    {
        "$class": "ba_timetracker.models.assets.AssetTimeEntry",
        "timeEntryId": "467",
        "spentOn": "2019-04-17T13:29:14.261Z",
        "duration": 12,
        "comment": "Hello World ",
        "employee": "resource:ba_timetracker.models.participants.Employee#timeHolder1"
    }


### how to Upgrade network 

update package.json version from 0.0.n to 0.0.n+1

    composer archive create --sourceType dir --sourceName . -a ./dist/ba_timetracker@0.0.8.bna

    composer network install -a ./dist/ba_timetracker@0.0.8.bna -c PeerAdmin@hlfv1
 
    composer network upgrade -c PeerAdmin@hlfv1  --networkName ba_timetracker --networkVersion 0.0.8
 
    composer network start --networkName ba_timetracker --networkVersion 0.0.8 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file token-admin.card


###  Create bash scripts for all this staff :) 