'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Token Transfer   
 * @param {org.ba_token.ba.TransferTokens} tokenTransaction
 * @transaction
 */
async function transferTokens(tx) {

    let participantRegistry = await getParticipantRegistry('org.ba_token.ba.TokenHolder')
    // Update the asset in the asset registry.
    let sender = participantRegistry.get(tx.senderId);
    let recipient = participantRegistry.get(tx.recipientId);
    
    if( sender.balance < tx.amount ){
        return
    } 
    sender.balance -= tx.amount
    recipient.balance += tx.amount

    await participantRegistry.update(sender)
    await participantRegistry.update(recipient)

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.ba_token.ba', 'TransferEvent');
    event.senderId = tx.senderId;
    event.recipientId = tx.recipientId;
    event.amount = tx.amount;
    emit(event);
}

/**
 * Token transaction
 * @param {org.ba_token.ba.MintTokens} mintTokens
 * @transaction
 */
async function mintTokens(mintTx) {

    const zeroID = "0000000000";

    let participantRegistry = await getParticipantRegistry('org.ba_token.ba.TokenHolder');

    let recipient = participantRegistry.get(mintTx.recipientId);

    recipient.balance += mintTx.amount;
    await participantRegistry.update(recipient);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.ba_token.ba', 'TransferEvent');
    event.senderId = zeroID;
    event.recipientId = mintTx.recipientId;
    event.amount = mintTx.amount;
    emit(event);
}
