const fs = require('fs');
const path = require('path');

const specs = [];
const steps = [];
const tests = [];

const jr = {

  name: 'JsonReporter',
  path: './reports',
  file: 'report.json',

  afterSpec(spec) {
    const _spec = {};
    _spec.id = spec.id;
    _spec.request = JSON.parse(JSON.stringify(spec.request));
    _spec.response = {};
    if (spec.response) {
      _spec.response = JSON.parse(JSON.stringify(spec.response));
    }
    _spec.recorded = spec.recorded;
    if (spec.status === 'PASSED') {
      _spec.request.headers = undefined;
      _spec.request.body = undefined;
      _spec.response.headers = undefined;
      _spec.response.body = undefined;
    }
    specs.push(_spec);
  },

  afterStep(step) {
    steps.push(step);
  },

  afterTest(test) {
    tests.push(test);
  },

  end() {
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path, { recursive: true });
    }
    fs.writeFileSync(path.resolve(this.path, this.file), JSON.stringify({ tests, steps, specs }, null, 2));
  },

  reset() {
    tests.length = 0;
    steps.length = 0;
    specs.length = 0;
  }

}

module.exports = jr;