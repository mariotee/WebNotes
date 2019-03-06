const assert = require("assert")
const lambda = require("../User")
var posted

describe("user POST", () => {
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
  it("should return the GET user", async () => {
    
  })
})

describe("user PUT", () => {
  it("should return the session that was PUT", async () => {
    let res = await lambda.handler({
      method: "PUT",
      session: true,
      put: {
        username: "TEST",
        password: "password",
        session: "12345",
      }
    })
    
    assert.strictEqual(res.session, "12345")
  })  
})

describe("user DELETE", () => {
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