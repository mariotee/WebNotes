const Database = require("./database.js")
const EntrySubLambda = require('./Entry')
const UserSubLambda = require('./User')

exports.router = async (event) => {
  await Database.open()
  let res
  switch(event.controller) {
    case 'ENTRY':
      res = await EntrySubLambda.handler(event.sub)
      await Database.close()
      break;
    case 'USER':
      res = await UserSubLambda.handler(event.sub)
      await Database.close()
      break;
    default:
      throw Error(`${event.sub} not accounted for`)
  }

  return await res
}