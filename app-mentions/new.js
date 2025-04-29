/*------------------
  NEW
  @rota new "[rotation-name]" [optional description]
  Creates a new rotation with description
------------------*/
module.exports = async (
	app,
	event,
	context,
	ec,
	utils,
	store,
	msgText,
	errHandler,
) => {
	try {
		const pCmd = await utils.parseCmd("new", event, context);
		const rotation = pCmd.rotation;
		const description = pCmd.description;
		console.log("pCmd: ", pCmd);
		console.log("rotation: ", rotation);
		console.log("description: ", description);

		if (utils.rotationInList(rotation, ec.rotaList)) {
			console.log("rotation exists");
			// Can't create a rotation that already exists
			const result = await app.client.chat.postMessage(
				utils.msgConfig(ec.botToken, ec.channelID, msgText.newError(rotation)),
			);
			console.log("result: ", result);
		} else {
			// Initialize a new rotation with description
			const save = await store.newRotation(rotation, description);
            console.log("save: ", save);
			const result = await app.client.chat.postMessage(
				utils.msgConfig(
					ec.botToken,
					ec.channelID,
					msgText.newConfirm(rotation),
				),
			);
			console.log("result: ", result);
		}
	} catch (err) {
		errHandler(app, ec, utils, err, msgText);
	}
};

