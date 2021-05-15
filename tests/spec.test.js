const pactum = require('pactum');
const { reporter } = pactum;
const assert = require('assert');
const jr = require('../src/index');

describe('Reporter', () => {

  it('spec passes', async () => {
    await pactum.spec()
      .useInteraction('get user')
      .get('/api/user')
      .expectStatus(200);
  });

  it('spec fails', async () => {
    try {
      await pactum.spec()
        .useInteraction('get user')
        .get('/api/user')
        .expectStatus(400);
    } catch { }
  });

  it('spec throws error', async () => {
    try {
      await pactum.spec()
        .get('http://localhost:9001/api/user')
        .expectStatus(200);
    } catch { }
  });

  it('run reporter', async () => {
    await reporter.end();
  });

  it('validate json report', async () => {
    const report = require('../reports/report.json');
    assert.strictEqual(report.specs.length, 3);
  });

  after(() => {
    jr.reset();
  });

});