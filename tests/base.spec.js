const { mock, handler, request, reporter } = require('pactum');
const jr = require('../src/index');

function mockSetup() {
  handler.addInteractionHandler('get user', () => {
    return {
      request: {
        method: 'GET',
        path: '/api/user'
      },
      response: {
        status: 200
      }
    }
  });
}

before(async () => {
  request.setBaseUrl('http://localhost:9393');
  reporter.add(jr);
  mockSetup();
  await mock.start();
});

after(async () => {
  await mock.stop();
});