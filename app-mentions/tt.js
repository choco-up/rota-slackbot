/*------------------
  TAG in the same thread
  @rota "[rotation]" tt  
  Tag the assigned user in the same thread
------------------*/
module.exports = async (app, event, context, ec, utils, store, msgText, errHandler) => {
  try {
    const pCmd = await utils.parseCmd('tt', event, context);
    const rotation = pCmd.rotation;

    if (utils.rotationInList(rotation, ec.rotaList)) {
      // If rotation exists, display its information
      const rotationObj = await store.getRotation(rotation);
      if (!!rotationObj.assigned) {
        // If someone is currently assigned, tag the PIC 
        const result = await app.client.chat.postMessage(
          utils.msgConfig(ec.botToken, ec.channelID, msgText.ttReport(rotationObj.assigned, rotation), ec.ts)
        );
      } else {
        // If nobody is assigned
        const result = await app.client.chat.postMessage(
          utils.msgConfig(ec.botToken, ec.channelID, msgText.nobodyAssigned(rotation))
        );
      }
    } else {
      // If rotation doesn't exist, send message saying nothing changed
      const result = await app.client.chat.postMessage(
        utils.msgConfig(ec.botToken, ec.channelID, msgText.whoError(rotation))
      );
    }
  }
  catch (err) {
    errHandler(app, ec, utils, err, msgText);
  }
};
