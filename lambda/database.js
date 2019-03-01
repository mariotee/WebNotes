const mongoose = require('mongoose')
const secrets = require("./secrets.js")

const CONN_STR = secrets.connectionstring
const OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

const Database = {
  open: async () => {    
    await mongoose.connect(CONN_STR,OPTIONS)
  },
  close: async () => {    
    await mongoose.connection.close();
  }
}

module.exports = Database