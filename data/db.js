const Rota = require("./Rota");

/*------------------
  DATABASE / STORE
------------------*/
const store = {
	/**
	 * Get rotations
	 * @return {object[]} array of existing rotation objects
	 */
	async getRotations() {
		const rotations = await Rota.find({});
		const arr = [];
		rotations.forEach((rotation) => {
			arr.push(rotation.toObject());
		});
		return arr;
	},
	/**
	 * Create new rotation
	 * @param {string} rotaname name of new rotation
	 * @param {string} description description of new rotation
	 * @return {object} newly saved rotation
	 */
	async newRotation(rotaname, description) {
		const rotation = new Rota({
			name: rotaname,
			description: description,
			assigned: null,
		});
		return rotation.save();
	},
	/**
	 * Update description for existing rotation
	 * @param {string} rotaname updated name of rotation
	 * @param {string} description updated description of rotation
	 * @return {object} newly updated, saved rotation
	 */
	async updateDescription(rotaname, description) {
		const r = await Rota.findOne({ name: rotaname });
		r.description = description;
		return r.save();
	},
	/**
	 * Save rotation staff to rotation store
	 * @param {string} rotaname rotation name
	 * @param {string[]} staffArr array of staff user IDs
	 *
	 */
	async saveStaff(rotaname, staffArr) {
		const rotation = await Rota.findOne({ name: rotaname });
		rotation.staff = staffArr;
		return rotation.save();
	},
	/**
	 * Save user assignment to rotation store
	 * @param {string} rotaname rotation name
	 * @param {string} usermention user mention string <@UXXXXX>
	 * @return {object} saved rotation with new assignment
	 */
	async saveAssignment(rotaname, usermention) {
		const rotation = await Rota.findOne({ name: rotaname });
		rotation.assigned = usermention;
		return rotation.save();
	},
	/**
	 * Get rotation object for a specific rotation
	 * @param {string} rotaname rotation name
	 * @return {object} rotation object
	 */
	async getRotation(rotaname) {
		return Rota.findOne({ name: rotaname });
	},
	/**
	 * Deletes a rotation entirely
	 * @param {string} rotaname rotation name
	 */
	async deleteRotation(rotaname) {
		return Rota.findOneAndDelete({ name: rotaname });
	},
};

module.exports = store;

