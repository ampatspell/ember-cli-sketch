(function() {

  function vendorModule() {
    'use strict';
    let lib = self['WebFont'];
    return lib;
  }

  define('webfontloader', [], vendorModule);
})();
