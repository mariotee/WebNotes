const EntryModel = require('./model.js');

class EntryController
{ 
  /**
   * get all entries from database
   */
  async getAllEntries() {
    return await EntryModel.find({});
  }

  /**
   * gets all entries from database by filter
   * @param {EntryModel} filter 
   */
  async getAllEntriesByFilter(filter) {
    return await EntryModel.find(filter);
  }

  /**
   * get entry from database by id
   * @param {String} id 
   */
  async getById(id) {
    return await EntryModel.findById(id);
  }

  /**
   * posts an entry to the database
   * @param {EntryModel} entry 
   */
  async post(entry) {    
    return await (new EntryModel(entry)).save();
  }

  /**
   * updates an entry in the database by id
   * @param {String} id 
   * @param {EntryModel} update 
   */
  async putById(id,update) {
    const options = {new: true};

    return await EntryModel.findByIdAndUpdate(id,update,options);
  }

  /**
   * deletes an entry in the database by id by setting the user to deleted
   * @param {String} id 
   */
  async deleteById(id) {    
    let entry = await EntryModel.findById(id);
    let now = Date.now();
    let noteTime = new Date(entry.timestamp).getTime();
    if(now - noteTime > 30000) {
      return await this._renameDelete(id);
    }
    
    return await this._actualDelete(id)
  }

  async _renameDelete(id) {
    return await this.putById(id, {
      user: 'deleted',
    });
  }

  async _actualDelete(id) {
    return await EntryModel.findByIdAndDelete(id);
  }
}

module.exports = EntryController;