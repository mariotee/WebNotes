const assert = require("assert")
const lambda = require("..")
var posted

describe("index ENTRY lambda", () => {
  it("should POST a new ENTRY from the index", async () => {
    const postreq = {
      user: "TEST",
      timestamp: new Date(),
      post: "index post",
    }

    let res = await lambda.router({
      controller: "ENTRY",
      sub: {
        method: "POST",
        post: postreq,
      }
    })

    posted = res

    assert.strictEqual(res.user, postreq.user.toLowerCase())
  })

  it("should DELETE ENTRY from the index", async () => {
    let res = await lambda.router({
      controller: "ENTRY",
      sub: {
        method: "DELETE",
        id: posted._id,
      }
    })

    assert.strictEqual(String(res._id), String(posted._id))
  })
})