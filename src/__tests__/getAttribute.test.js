'use strict';

const fs = require('fs');

const NetCDFReader = require('..');

const pathFiles = `${__dirname}/files/`;

test('getAttribute', function () {
  const data = fs.readFileSync(`${pathFiles}P071.CDF`);

  let reader = new NetCDFReader(data);
  expect(reader.getAttribute('operator_name')).toBe('SC');
});
