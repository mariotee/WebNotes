const Controller =  require('./controller.js')

exports.handler = async (event) => {
  const controller = new Controller()
  
  switch (event.method) {
    case 'GET':
      return await controller.getUser(event.get)
    case 'POST':
      return await controller.createAccount(event.post)
    case 'PUT':
      return await controller.updateEmail(event.put)
    case 'DELETE':
      return await controller.deleteAccount(event.delete)
    default: 
      throw Error('method not specified')
  }
}