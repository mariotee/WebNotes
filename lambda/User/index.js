const Controller =  require('./controller.js')

exports.handler = async (event) => {
  const controller = new Controller()
  
  switch (event.method) {
    case 'GET':
      return await controller.getUser(event.get)
    case 'POST':
      console.log("entered user handler post")
      return await controller.createAccount(event.post)
    case 'PUT':
      if (event.email)
        return await controller.updateEmail(event.put)
      if (event.session)
        return await controller.updateSession(event.put)
      else throw Error("missing a PUT key")
    case 'DELETE':
      return await controller.deleteAccount(event.delete)
    default: 
      throw Error("method not specified")
  }  
}