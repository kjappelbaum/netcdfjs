'use strict';

const fs = require('fs');

const NetCDFReader = require('..');

const pathFiles = `${__dirname}/files/`;

test('dataVariableExists', function () {
  const data = fs.readFileSync(`${pathFiles}P071.CDF`);

  let reader = new NetCDFReader(data);
  expect(reader.dataVariableExists('instrument_name')).toBe(true);
  expect(reader.dataVariableExists('instrument_nameXX')).toBe(false);
});
