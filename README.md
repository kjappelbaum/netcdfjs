# netcdfjs

[![NPM version][npm-image]][npm-url]
[![Test coverage][codecov-image]][codecov-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Read and explore NetCDF v3 files.

## Installation

`$ npm install netcdfjs`

## [API Documentation](https://cheminfo.github.io/netcdfjs/)

For further information about the grammar you should go to [this link](https://www.unidata.ucar.edu/software/netcdf/docs/file_format_specifications.html).

### Example I: NodeJS

```js
const fs = require('fs');
const NetCDFReader = require('netcdfjs');

// http://www.unidata.ucar.edu/software/netcdf/examples/files.html
const data = fs.readFileSync('madis-sao.nc');

var reader = new NetCDFReader(data); // read the header
reader.getDataVariable('wmoId'); // go to offset and read it
```

### Example II: Load from URL (does not require node)

```js
// First load the netcdfjs library as normal : <script src='./dist/netcdfjs.js'></script>
// You could use the oficial CDN: <script src='http://www.lactame.com/lib/netcdfjs/0.3.0/netcdfjs.min.js'></script>

var urlpath =
  'http://www.unidata.ucar.edu/software/netcdf/examples/madis-sao.nc';
var reader;

var oReq = new XMLHttpRequest();
oReq.open('GET', urlpath, true);
oReq.responseType = 'blob';

oReq.onload = function(oEvent) {
  var blob = oReq.response;
  reader_url = new FileReader();

  reader_url.onload = function(e) {
    reader = new netcdfjs(this.result);
  };

  reader_url.readAsArrayBuffer(blob);
};
oReq.send(); //start process

reader.getDataVariable('wmoId'); // go to offset and read it
```

### Example III: Client side file upload

This example creates a file input element and allows the user to select a file from their personal machine.

```js
var reader;
var progress = document.querySelector('.percent');
function abortRead() {
  reader.abort();
}

function handleFileSelect(evt) {
  // Reset progress indicator on new file selection.
  progress.style.width = '0%';
  progress.textContent = '0%';

  reader = new FileReader();
  reader.onerror = errorHandler;
  reader.onprogress = updateProgress;
  reader.onabort = function(e) {
    alert('File read cancelled');
  };
  reader.onloadstart = function(e) {
    document.getElementById('progress_bar').className = 'loading';
  };
  reader.onload = function(e) {
    // Ensure that the progress bar displays 100% at the end.
    progress.style.width = '100%';
    progress.textContent = '100%';
    setTimeout("document.getElementById('progress_bar').className='';", 2000);
    //var reader = new NetCDFReader(reader.result);

    //replace reader with NetCDF reader
    reader = new netcdfjs(this.result);
    reader.getDataVariable('wmoId'); // go to offset and read it

    //... your program here  ..//
  };
  reader.readAsArrayBuffer(evt.target.files[0]);
}

// Make input element <input type="file" id="files" name="file" />
var input = document.createElement('input');
input.id = 'files';
input.type = 'file';
input.className = 'file';
document.body.appendChild(input); // put it into the DOM

// Make a Progress bar <div id="progress_bar"><div class="percent">0%</div></div>
var progress = document.createElement('div');
progress.id = 'progress_bar';
inner = document.createElement('div');
inner.className = 'percent';
inner.id = 'innerdiv'; // set the CSS class
progress.appendChild(inner);
document.body.appendChild(progress); // put it into the DOM

//Start event listener to check if a file has been selected
run = document
  .getElementById('files')
  .addEventListener('change', handleFileSelect, false);

///Progress bar and other functions
function errorHandler(evt) {
  switch (evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
      alert('File Not Found!');
      break;
    case evt.target.error.NOT_READABLE_ERR:
      alert('File is not readable');
      break;
    case evt.target.error.ABORT_ERR:
      break;
    default:
      alert('An error occurred reading this file.');
  }
}

function updateProgress(evt) {
  // evt is an ProgressEvent. Updates progress bar
  if (evt.lengthComputable) {
    var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
    // Increase the progress bar length.
    if (percentLoaded < 100) {
      progress.style.width = percentLoaded + '%';
      progress.textContent = percentLoaded + '%';
    }
  }
}
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/netcdfjs.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/netcdfjs
[ci-image]: https://github.com/cheminfo/netcdfjs/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/cheminfo/netcdfjs/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/netcdfjs.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/cheminfo/netcdfjs
[download-image]: https://img.shields.io/npm/dm/netcdfjs.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/netcdfjs
