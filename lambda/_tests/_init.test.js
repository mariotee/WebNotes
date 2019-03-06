const Database = require("../database.js")

before(async () => {
  await Database.open()
})

after(async () => {
  await Database.close()
})