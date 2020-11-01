const test = require('uvu').test;
const assert = require('uvu/assert');
const pactum = require('pactum');
const reporter = pactum.reporter;
const mock = pactum.mock;
const request = pactum.request;
const handler = pactum.handler;

const jr = require('../src/index');

test.before(() => {
  reporter.add(jr);
  request.setBaseUrl('http://localhost:9393');
  handler.addMockInteractionHandler('get user', () => {
    return {
      withRequest: {
        method: 'GET',
        path: '/api/user'
      },
      willRespondWith: {
        status: 200
      }
    }
  });
  return mock.start();
});

test.after(() => {
  return mock.stop();
});

test('spec passed', async () => {
  await pactum.spec()
    .useMockInteraction('get user')
    .get('/api/user')
    .expectStatus(200);
});

test('spec failed', async () => {
  try {
    await pactum.spec()
      .get('/api/user')
      .expectStatus(200);
  } catch (error) {
    console.log(error);
  }
});

test('spec error', async () => {
  try {
    await pactum.spec()
      .get('http://localhost:9001/api/user')
      .expectStatus(200);
  } catch (error) {
    console.log(error);
  }
});

test('run reporter', async () => {
  await reporter.end();
});

test('validate json reporter', async () => {
  const report = require('../reports/report.json');
  console.log(JSON.stringify(report, null, 2));
  assert.equal(report.specs.length, 3);
});

test.run();