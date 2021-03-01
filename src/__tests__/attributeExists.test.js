'use strict';

const fs = require('fs');

const NetCDFReader = require('..');

const pathFiles = `${__dirname}/files/`;

test('attributeExists', function () {
  const data = fs.readFileSync(`${pathFiles}P071.CDF`);

  let reader = new NetCDFReader(data);
  expect(reader.attributeExists('operator_name')).toBe(true);
  expect(reader.attributeExists('operator_nameXX')).toBe(false);
});
