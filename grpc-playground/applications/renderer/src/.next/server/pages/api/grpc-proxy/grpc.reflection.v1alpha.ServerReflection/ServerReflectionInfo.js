(function() {
var exports = {};
exports.id = 775;
exports.ids = [775];
exports.modules = {

/***/ 4565:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((req, res) => {
  if (req.body.listServices) {
    res.status(200).json({
      validHost: '',
      originalRequest: {
        host: '',
        listServices: 'true',
        messageRequest: 'listServices'
      },
      listServicesResponse: {
        service: [{
          name: 'grpc.reflection.v1alpha.ServerReflection'
        }, {
          name: 'examples.playground.v1.PlaygroundService'
        }]
      },
      messageResponse: 'listServicesResponse'
    });
  } else if (req.body.fileContainingSymbol === 'examples.playground.v1.PlaygroundService') {
    res.status(200).json({
      validHost: '',
      originalRequest: {
        host: '',
        fileContainingSymbol: 'examples.playground.v1.PlaygroundService',
        messageRequest: 'fileContainingSymbol'
      },
      fileDescriptorResponse: {
        fileDescriptorProto: [{
          type: 'Buffer',
          data: 'base64:ChxleGFtcGxlc19wbGF5Z3JvdW5kX3YxLnByb3RvEhZleGFtcGxlcy5wbGF5Z3JvdW5kLnYxIhsKC0VjaG9SZXF1ZXN0EgwKBHBpbmcYASABKAkiHAoMRWNob1Jlc3BvbnNlEgwKBHBvbmcYASABKAkiHgoNU3dpdGNoUmVxdWVzdBINCgV2YWx1ZRgBIAEoCCIfCg5Td2l0Y2hSZXNwb25zZRINCgV2YWx1ZRgBIAEoCCIeCgtUZXh0UmVxdWVzdBIPCgdtZXNzYWdlGAEgASgJIh8KDFRleHRSZXNwb25zZRIPCgdtZXNzYWdlGAEgASgJItIBCg1OdW1iZXJSZXF1ZXN0Eg0KBWludDMyGAEgASgFEg0KBWludDY0GAIgASgDEg4KBnVpbnQzMhgDIAEoDRIOCgZ1aW50NjQYBCABKAQSDgoGc2ludDMyGAUgASgREg4KBnNpbnQ2NBgGIAEoEhIPCgdmaXhlZDMyGAcgASgHEg8KB2ZpeGVkNjQYCCABKAYSEAoIc2ZpeGVkMzIYCSABKA8SEAoIc2ZpeGVkNjQYCiABKBASDgoGZG91YmxlGAsgASgBEg0KBWZsb2F0GAwgASgCItMBCg5OdW1iZXJSZXNwb25zZRINCgVpbnQzMhgBIAEoBRINCgVpbnQ2NBgCIAEoAxIOCgZ1aW50MzIYAyABKA0SDgoGdWludDY0GAQgASgEEg4KBnNpbnQzMhgFIAEoERIOCgZzaW50NjQYBiABKBISDwoHZml4ZWQzMhgHIAEoBxIPCgdmaXhlZDY0GAggASgGEhAKCHNmaXhlZDMyGAkgASgPEhAKCHNmaXhlZDY0GAogASgQEg4KBmRvdWJsZRgLIAEoARINCgVmbG9hdBgMIAEoAiIlCgtFbnVtUmVxdWVzdBIWCgZjb3JwdXMYASABKA4yBkNvcnB1cyImCgxFbnVtUmVzcG9uc2USFgoGY29ycHVzGAEgASgOMgZDb3JwdXMiLQoQTmVzdGVkR3JhbmRDaGlsZBIKCgJpZBgBIAEoCRINCgV2YWx1ZRgCIAEoCSJCCgtOZXN0ZWRDaGlsZBINCgV2YWx1ZRgBIAEoCRIkCgpncmFuZENoaWxkGAIgASgLMhBOZXN0ZWRHcmFuZENoaWxkIjsKDE5lc3RlZFJlc3VsdBIPCgdtZXNzYWdlGAEgASgJEhoKBWNoaWxkGAIgASgLMgtOZXN0ZWRDaGlsZCItCg1OZXN0ZWRSZXF1ZXN0EhwKBnJlc3VsdBgBIAEoCzIMTmVzdGVkUmVzdWx0Ii4KDk5lc3RlZFJlc3BvbnNlEhwKBnJlc3VsdBgBIAEoCzIMTmVzdGVkUmVzdWx0Ij4KDlJlcGVhdGVkUmVzdWx0EgsKA3VybBgBIAEoCRINCgV0aXRsZRgCIAEoCRIQCghzbmlwcGV0cxgDIAMoCSIyCg9SZXBlYXRlZFJlcXVlc3QSHwoHcmVzdWx0cxgBIAMoCzIOUmVwZWF0ZWRSZXN1bHQiMwoQUmVwZWF0ZWRSZXNwb25zZRIfCgdyZXN1bHRzGAEgAygLMg5SZXBlYXRlZFJlc3VsdCI1ChFLaXRjaGVuU2lua0Ftb3VudBIOCgZhbW91bnQYASABKAkSEAoIY3VycmVuY3kYAiABKAkiLwoTS2l0Y2hlblNpbmtEb2N1bWVudBIKCgJpZBgBIAEoCRIMCgR0eXBlGAIgASgJIkIKD0tpdGNoZW5TaW5rSW5mbxINCgV0aXRsZRgBIAEoCRITCgtkZXNjcmlwdGlvbhgCIAEoCRILCgN1cmwYAyABKAkiMgoUS2l0Y2hlblNpbmtJdGVtRmllbGQSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJImoKD0tpdGNoZW5TaW5rSXRlbRINCgVwcmljZRgBIAEoCRIQCghjdXJyZW5jeRgCIAEoCRIQCghxdWFudGl0eRgDIAEoBRIkCgZmaWVsZHMYBCADKAsyFEtpdGNoZW5TaW5rSXRlbUZpZWxkIs4BChJLaXRjaGVuU2lua1JlcXVlc3QSFQoNcGF5bWVudE1ldGhvZBgBIAEoCRIYChBiaWxsaW5nQWNjb3VudElkGAIgASgJEiEKBmFtb3VudBgDIAEoCzIRS2l0Y2hlblNpbmtBbW91bnQSJQoIZG9jdW1lbnQYBCABKAsyE0tpdGNoZW5TaW5rRG9jdW1lbnQSHQoEaW5mbxgFIAEoCzIPS2l0Y2hlblNpbmtJbmZvEh4KBWl0ZW1zGAYgAygLMg9LaXRjaGVuU2lua0l0ZW0izwEKE0tpdGNoZW5TaW5rUmVzcG9uc2USFQoNcGF5bWVudE1ldGhvZBgBIAEoCRIYChBiaWxsaW5nQWNjb3VudElkGAIgASgJEiEKBmFtb3VudBgDIAEoCzIRS2l0Y2hlblNpbmtBbW91bnQSJQoIZG9jdW1lbnQYBCABKAsyE0tpdGNoZW5TaW5rRG9jdW1lbnQSHQoEaW5mbxgFIAEoCzIPS2l0Y2hlblNpbmtJbmZvEh4KBWl0ZW1zGAYgAygLMg9LaXRjaGVuU2lua0l0ZW0qlwEKBkNvcnB1cxIgChxDT1JQVVNfVU5JVkVSU0FMX1VOU1BFQ0lGSUVEEAASDgoKQ09SUFVTX1dFQhABEhEKDUNPUlBVU19JTUFHRVMQAhIQCgxDT1JQVVNfTE9DQUwQAxIPCgtDT1JQVVNfTkVXUxAEEhMKD0NPUlBVU19QUk9EVUNUUxAFEhAKDENPUlBVU19WSURFTxAGMt4FChFQbGF5Z3JvdW5kU2VydmljZRJRCgRFY2hvEiMuZXhhbXBsZXMucGxheWdyb3VuZC52MS5FY2hvUmVxdWVzdBokLmV4YW1wbGVzLnBsYXlncm91bmQudjEuRWNob1Jlc3BvbnNlElcKBlN3aXRjaBIlLmV4YW1wbGVzLnBsYXlncm91bmQudjEuU3dpdGNoUmVxdWVzdBomLmV4YW1wbGVzLnBsYXlncm91bmQudjEuU3dpdGNoUmVzcG9uc2USUQoEVGV4dBIjLmV4YW1wbGVzLnBsYXlncm91bmQudjEuVGV4dFJlcXVlc3QaJC5leGFtcGxlcy5wbGF5Z3JvdW5kLnYxLlRleHRSZXNwb25zZRJXCgZOdW1iZXISJS5leGFtcGxlcy5wbGF5Z3JvdW5kLnYxLk51bWJlclJlcXVlc3QaJi5leGFtcGxlcy5wbGF5Z3JvdW5kLnYxLk51bWJlclJlc3BvbnNlElEKBEVudW0SIy5leGFtcGxlcy5wbGF5Z3JvdW5kLnYxLkVudW1SZXF1ZXN0GiQuZXhhbXBsZXMucGxheWdyb3VuZC52MS5FbnVtUmVzcG9uc2USVwoGTmVzdGVkEiUuZXhhbXBsZXMucGxheWdyb3VuZC52MS5OZXN0ZWRSZXF1ZXN0GiYuZXhhbXBsZXMucGxheWdyb3VuZC52MS5OZXN0ZWRSZXNwb25zZRJdCghSZXBlYXRlZBInLmV4YW1wbGVzLnBsYXlncm91bmQudjEuUmVwZWF0ZWRSZXF1ZXN0GiguZXhhbXBsZXMucGxheWdyb3VuZC52MS5SZXBlYXRlZFJlc3BvbnNlEmYKC0tpdGNoZW5TaW5rEiouZXhhbXBsZXMucGxheWdyb3VuZC52MS5LaXRjaGVuU2lua1JlcXVlc3QaKy5leGFtcGxlcy5wbGF5Z3JvdW5kLnYxLktpdGNoZW5TaW5rUmVzcG9uc2ViBnByb3RvMw=='
        }]
      },
      messageResponse: 'fileDescriptorResponse'
    });
  } else {
    res.status(404);
  }
});

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(4565));
module.exports = __webpack_exports__;

})();