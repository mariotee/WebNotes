const Database = require("../database.js")
const assert = require("assert")
const lambda = require("../Entry")
var posted

describe("entry POST", () => {
  before(async () => {
    await Database.open()
  })

  after(async () => {
    await Database.close()
  })

  it("should return the POSTed data", async () => {
    const postreq = {
      user: "TEST",
      timestamp: new Date(),
      post: "test post",
    }

    let res = await lambda.handler({
      method: "POST",
      post: postreq,
    })

    assert.strictEqual(res.user, postreq.user.toLowerCase())

    posted = res
  })

  it("should fail to POST due to missing field", async () => {    
    const postreq = {
      timestamp: new Date(),
      post: "test post",
    }

    await lambda.handler({
      method: "POST",
      post: postreq,
    })
    .catch((err) => {
      assert.notStrictEqual(err, undefined)
    })
  })  
})

describe("entry GET", () => {
  before(async () => {
    await Database.open()
  })

  after(async () => {
    await Database.close()
  })

  it("should return the data from GET by filter", async () => {
    let get = await lambda.handler({
      method: "GET",
      byFilter: true,
      get: {
        user: posted.user,
      }
    })

    assert.strictEqual(get.length, 1)
    assert.strictEqual(get[0].user, posted.user)
  })

  it("should return the data from GET by id", async () => {    
    let get = await lambda.handler({
      method: "GET",
      byId: true,
      id: posted._id,
    })
    
    assert.strictEqual(get.user, posted.user)
  })

  it("should fail to GET due to invalid id", async () => {
    let get = await lambda.handler({
      method: "GET",
      byId: true,
      id: posted._id+"1",
    })
    .catch((err) => {
      assert.notStrictEqual(err, undefined)
    })
  })
})

describe("entry UPDATE", () => {
  before(async () => {
    await Database.open()
  })

  after(async () => {
    await Database.close()
  })

  it("should return the UPDATEd data which is the same", async () => {
    let updated = await lambda.handler({
      method: "PUT",
      id: posted._id,
      put: {}
    })

    assert.strictEqual(updated.post, posted.post)
  })

  it("should return the UPDATEd data", async () => {
    let updated = await lambda.handler({
      method: "PUT",
      id: posted._id,
      put: { 
        post: "updated"
      }
    })

    assert.notStrictEqual(updated.post, posted.post)
  })  

  it("should fail to UPDATE due to invalid id", async () => {
    let updated = await lambda.handler({
      method: "PUT",
      id: posted._id+"1",
      put: {}
    })
    .catch((err) => {
      assert.notStrictEqual(err, undefined)
    })
  })
})

describe("entry DELETE", () => {
  before(async () => {
    await Database.open()
  })

  after(async () => {
    await Database.close()
  })
  
  it("should return the DELETEd data", async () => {    
    let deleted = await lambda.handler({
      method: "DELETE",
      id: posted._id,
    })

    assert.strictEqual(String(deleted._id), String(posted._id))
  })

  it("should fail to DELETE due to invalid id", async () => {
    await lambda.handler({
      method: "DELETE",
      id: "_not an id_",
    })
    .catch((err) => {
      assert.notStrictEqual(err, undefined)
    })
  })
})