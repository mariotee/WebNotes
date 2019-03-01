const Database = require("../database.js")
const assert = require("assert")
const lambda = require("../User")
var posted

describe("user POST", () => {
  before(async () => {
    await Database.open()
  })

  after(async () => {
    await Database.close()
  })

  it("should return the POSTed user", async () => {
    const postreq = {
      username: "TEST",
      password: "password",
    }

    let res = await lambda.handler({
      method: "POST",
      post: postreq,
    })

    assert.strictEqual(res.username, postreq.username.toLowerCase())

    posted = res
  })  
})

describe("user GET", () => {
  before(async () => {
    await Database.open()
  })

  after(async () => {
    await Database.close()
  })

  it("should return the GET user", async () => {
    
  })
})

describe("user PUT", () => {
  before(async () => {
    await Database.open()
  })

  after(async () => {
    await Database.close()
  })

  it("should return the PUT user", async () => {
    
  })
})

describe("user DELETE", () => {
  before(async () => {
    await Database.open()
  })

  after(async () => {
    await Database.close()
  })
  
  it("should return the DELETEd user", async () => {
    let res = await lambda.handler({
      method: "DELETE",
      delete: {
        username: posted.username,
        password: "password",
      }
    })

    assert.strictEqual(res.username, posted.username)
  })  
})