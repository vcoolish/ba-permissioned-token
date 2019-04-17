const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

async function addParticipant() {
    let businessNetworkConnection = new BusinessNetworkConnection();

    try {
        await businessNetworkConnection.connect('admin@admin@ba_token');
        let participantRegistry = await businessNetworkConnection.getParticipantRegistry('net.biz.BaNetwork');
        let factory = businessNetworkConnection.getFactory();
        let participant = factory.newResource('net.biz.BaNetwork', 'Person', 'sergii@ba_token.org');
        participant.firstName = 'Sergii';
        participant.lastName = 'B';
        await participantRegistry.add(participant);
        await businessNetworkConnection.disconnect();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

addParticipant();