const UserModel = require('./model.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

class UserController
{  
  async getUser(req) {
    let res = await UserModel.findOne({
      username: req.username,
    });
    
    if(res && bcrypt.compareSync(req.password, res.password)) {
      return ({
        username: res.username,
        email: res.email,
        session: res.session,
      });
    }
  }

  async createAccount(req) {
    if(req.password) {
      const salt = bcrypt.genSaltSync(saltRounds);      
      const hash = bcrypt.hashSync(req.password,salt);      
      req.password = hash;
      
      let res = await (new UserModel(req)).save()
        .catch((err) => {
          throw new Error("error on save new account")
        })
      
      return ({
        username: res.username,
        email: res.email,
      });
    };
    
    throw new Error("cannot create account with this request")    
  }

  async updateEmail(req) {
    const options = {new: true};
    const updates = {
      email: req.email,
    }
    let get = await UserModel.findOne({
      username: req.username,
    });

    if(get && bcrypt.compareSync(req.password, get.password)) {
      let res = await UserModel.findOneAndUpdate({
        username: req.username,
      }, updates, options);

      return ({
        username: res.username,
        email: res.email,
      });
    }
  }

  async updateSession(req) {
    const options = {new: true};
    const updates = {
      session: req.session
    }

    let get = await UserModel.findOne({
      username: req.username,
    });

    if(get && bcrypt.compareSync(req.password, get.password)) {
      let res = await UserModel.findOneAndUpdate({
        username: req.username,
      }, updates, options);

      return {
        username: res.username,
        email: res.email,
        session: res.session,
      }
    }
  }

  async deleteAccount(req) {    
    let get = await UserModel.findOne({
      username: req.username,
    });

    if(get && bcrypt.compareSync(req.password, get.password)) {
      let res = await UserModel.findOneAndDelete({
        username: req.username,
      });

      return ({
        username: res.username,
        email: res.email,
      });
    }
  }
}

module.exports = UserController;