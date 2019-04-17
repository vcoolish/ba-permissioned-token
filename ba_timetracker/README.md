# ba_timetracker

BNA timetracker

steps to start network and application

 install prereqs, composer, fabric etc.
 Assuming to use HLFV12 with composer v0.20.5+

 ### run scripts:
    ./fabric-dev-servers/startFabric.sh

    ./fabric-dev-servers/createPeerAdminCard.sh


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


### Start rest server from Identity (user) 