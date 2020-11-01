# pactum-json-reporter

JSON reporter for pactum tests

## Installation

```shell
npm install --save-dev pactum
npm install --save-dev pactum-json-reporter
```

## Usage

```javascript
const pjr = require('pactum-json-reporter');
const pactum = require('pactum');
const reporter = pactum.reporter;

// global before block
before(() => {
  reporter.add(pjr);
});

// global after block
after(() => {
  return reporter.end();
});
```

### Options

```javascript
const pjr = require('pactum-json-reporter');

// name of the report file - defaults to "report.json"
pjr.name = 'report-name.json';

// folder path for the report file - defaults to "./reports"
pjr.path = './reports-path';
```