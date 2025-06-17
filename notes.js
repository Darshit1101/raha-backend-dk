// `express.json()`   (JSON requests)
// `express.urlencoded()`  (HTML form (URL-encoded))
// `multer()` (Form-data   (`multipart/form-data`)) 
// `upload.none()`  (Form-data without files)     

// commonJS ==> syncronous module 
// const fs = require('fs');
// module.exports = myFunction;
// we have to set "type": "commonjs" in package.json to use commonJS (optional, default is commonJS)
// Top level await is not allowed.
// Only one value can be exported in commonJS.

// ES Modules ==> Asynchronous module
// import fs from 'fs';
// export default myFunction;
// we have to set "type": "module" in package.json to use ES Modules
// Top level await is allowed in ES Modules.
// Multiple value can be exported in ES Modules.