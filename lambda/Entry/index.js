const Controller =  require('./controller.js')

exports.handler = async (event) => {
  const controller = new Controller()
  
  switch(event.method) {
    case 'GET':
      if( event.byId ) {
        return await controller.getById(event.id);
      }
      else if( event.byFilter ) {
        return await controller.getAllEntriesByFilter(event.get);
      }
      
      return await controller.getAllEntries();
    case 'POST':
      return await controller.post(event.post);
    case 'PUT':
      return await controller.putById(event.id, event.put);
    case 'DELETE':      
      return await controller.deleteById(event.id);
    default: 
      throw Error('method not specified')
  }
}