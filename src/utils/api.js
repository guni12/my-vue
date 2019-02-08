const mocks = {
  'auth': { 'POST': { token: 'This-is-a-mocked-token' } },
  'user/me': { 'GET': { name: 'doggo', title: 'sir' } }
}

const apiCall = ({url, method, ...args}) => new Promise((resolve, reject) => {
  // eslint-disable-next-line
  console.log(args);
  setTimeout(() => {
    try {
      resolve(mocks[url][method || 'GET'])
      // eslint-disable-next-line
      console.log(`Mocked '${url}' - ${method || 'GET'}`)
      // eslint-disable-next-line
      console.log('response: ', mocks[url][method || 'GET'])
    } catch (err) {
      reject(new Error(err))
    }
  }, 1000)
})

export default apiCall
