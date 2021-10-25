exports.id = 824;
exports.ids = [824];
exports.modules = {

/***/ 8747:
/***/ (function() {



/***/ }),

/***/ 6824:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "IndexPage": function() { return /* reexport */ IndexPage; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ../../../../.yarn/__virtual__/@atls-ui-parts-layout-virtual-bd97fd995e/0/cache/@atls-ui-parts-layout-npm-0.0.1-fb4220d6c9-6ba0fb5f12.zip/node_modules/@atls-ui-parts/layout/dist/index.js
var dist = __webpack_require__(6394);
// EXTERNAL MODULE: ../../../../.yarn/__virtual__/react-router-dom-virtual-96c998274b/0/cache/react-router-dom-npm-6.0.0-beta.0-3798eecb43-d01e019649.zip/node_modules/react-router-dom/main.js
var main = __webpack_require__(3057);
;// CONCATENATED MODULE: ../../../stores/proto-registry/src/proto-registry.context.ts

const Context = /*#__PURE__*/(0,external_react_.createContext)(null);
const {
  Provider,
  Consumer
} = Context;
// EXTERNAL MODULE: ../../../../.yarn/cache/buffer-json-npm-2.0.0-da08ae4b55-9b8601d25f.zip/node_modules/buffer-json/index.js
var buffer_json = __webpack_require__(8349);
var buffer_json_default = /*#__PURE__*/__webpack_require__.n(buffer_json);
;// CONCATENATED MODULE: ../../../clients/grpc-http-proxy-client/src/grpc-http-proxy.client.ts


const getDefaultUrl = () => {
  if (false) {}

  if (false) {}

  return 'http://localhost:3000/api';
};

class GrpcHttpProxyClient {
  constructor(url = getDefaultUrl()) {
    this.url = url;
  }

  async call(service, method, payload) {
    const response = await fetch(`${this.url}/grpc-proxy/${service}/${method}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return buffer_json_default().parse(await response.text());
  }

}
;// CONCATENATED MODULE: ../../../clients/grpc-http-proxy-client/src/index.ts

// EXTERNAL MODULE: ../../../../.yarn/unplugged/protobufjs-npm-6.11.2-9b422ce98e/node_modules/protobufjs/ext/descriptor/index.js
var descriptor = __webpack_require__(1084);
var descriptor_default = /*#__PURE__*/__webpack_require__.n(descriptor);
// EXTERNAL MODULE: ../../../../.yarn/unplugged/protobufjs-npm-6.11.2-9b422ce98e/node_modules/protobufjs/index.js
var protobufjs = __webpack_require__(8454);
// EXTERNAL MODULE: ../../../../.yarn/cache/lodash.set-npm-4.3.2-7586c942c2-a9122f49ee.zip/node_modules/lodash.set/index.js
var lodash_set = __webpack_require__(1957);
var lodash_set_default = /*#__PURE__*/__webpack_require__.n(lodash_set);
// EXTERNAL MODULE: external "events"
var external_events_ = __webpack_require__(8614);
// EXTERNAL MODULE: ../../../../.yarn/cache/uuid-npm-8.3.2-eca0baba53-5575a8a75c.zip/node_modules/uuid/dist/esm-node/v4.js + 4 modules
var v4 = __webpack_require__(9242);
;// CONCATENATED MODULE: ../../../stores/proto-registry/src/schema.utils.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable */




const MAX_STACK_SIZE = 3;
const buildServiceMethods = (service, type = 0) => {
  const root = service.root;
  const serviceMethods = service.methods; // @ts-ignore

  return Object.keys(serviceMethods).reduce((methods, method) => {
    const serviceMethod = serviceMethods[method];
    const methodMessageType = type === 0 ? serviceMethod.requestType : serviceMethod.responseType;
    const messageType = root.lookupType(methodMessageType);
    methods[method] = {
      name: method,
      input: buildTypeFields(messageType)
    };
    return methods;
  }, {});
};
const buildTypeFields = (type, stackDepth = {}) => {
  if (stackDepth[type.name] > MAX_STACK_SIZE) {
    return {};
  }

  if (!stackDepth[type.name]) {
    stackDepth[type.name] = 0;
  }

  stackDepth[type.name]++;
  return type.fieldsArray.reduce((data, field) => {
    field.resolve();

    if (field.parent !== field.resolvedType) {
      if (field.repeated) {
        data[field.name] = [buildField(field, stackDepth)];
      } else {
        data[field.name] = buildField(field, stackDepth);
      }
    }

    return data;
  }, {});
};
const buildField = (field, stackDepth = {}) => {
  if (field instanceof protobufjs.MapField) {
    let mockPropertyValue = null;

    if (field.resolvedType === null) {
      mockPropertyValue = buildScalarValue(field.type, field.name);
    }

    if (mockPropertyValue === null) {
      const resolvedType = field.resolvedType;

      if (resolvedType instanceof protobufjs.Type) {
        if (resolvedType.oneofs) {
          mockPropertyValue = pickOneOf(resolvedType.oneofsArray);
        } else {
          mockPropertyValue = buildTypeFields(resolvedType);
        }
      } else if (resolvedType instanceof protobufjs.Enum) {
        mockPropertyValue = buildEnum(resolvedType);
      } else if (resolvedType === null) {
        mockPropertyValue = {};
      }
    }

    return {
      [buildScalarValue(field.keyType, field.name)]: mockPropertyValue
    };
  }

  if (field.resolvedType instanceof protobufjs.Type) {
    return buildTypeFields(field.resolvedType, stackDepth);
  }

  if (field.resolvedType instanceof protobufjs.Enum) {
    return buildEnum(field.resolvedType);
  }

  const mockPropertyValue = buildScalar(field);

  if (mockPropertyValue === null) {
    const resolvedField = field.resolve();
    return buildField(resolvedField, stackDepth);
  } else {
    return mockPropertyValue;
  }
};
const buildEnum = enumType => {
  const enumKey = Object.keys(enumType.values)[0];
  return {
    value: enumType.values[enumKey]
  };
};
const pickOneOf = oneofs => oneofs.reduce((fields, oneOf) => {
  fields[oneOf.name] = buildField(oneOf.fieldsArray[0]);
  return fields;
}, {});
const buildScalar = field => {
  return _objectSpread(_objectSpread({}, field), {}, {
    value: buildScalarValue(field.type, field.name)
  });
};
const interpretMockViaFieldName = fieldName => {
  const fieldNameLower = fieldName.toLowerCase();

  if (fieldNameLower.startsWith('id') || fieldNameLower.endsWith('id')) {
    return (0,v4/* default */.Z)();
  }

  return 'Hello';
};
const buildScalarValue = (type, fieldName) => {
  switch (type) {
    case 'string':
      return interpretMockViaFieldName(fieldName);

    case 'number':
      return 10;

    case 'bool':
      return true;

    case 'int32':
      return 10;

    case 'int64':
      return 20;

    case 'uint32':
      return 100;

    case 'uint64':
      return 100;

    case 'sint32':
      return 100;

    case 'sint64':
      return 1200;

    case 'fixed32':
      return 1400;

    case 'fixed64':
      return 1500;

    case 'sfixed32':
      return 1600;

    case 'sfixed64':
      return 1700;

    case 'double':
      return 1.4;

    case 'float':
      return 1.1;

    case 'bytes':
      // @ts-ignore
      return new TextEncoder('utf-8').encode('Hello');

    default:
      return null;
  }
};
;// CONCATENATED MODULE: ../../../stores/proto-registry/src/proto.utils.ts








const isNamespace = lookupType => {
  if (lookupType instanceof protobufjs.Namespace && !(lookupType instanceof protobufjs.Service) && !(lookupType instanceof protobufjs.Type) && !(lookupType instanceof protobufjs.Enum) && !(lookupType instanceof protobufjs.Field) && !(lookupType instanceof protobufjs.MapField) && !(lookupType instanceof protobufjs.OneOf) && !(lookupType instanceof protobufjs.Method)) {
    return true;
  }

  return false;
};
const matchingAncestorNamespaceLookup = (typeName, parentNamespace, namespaceChain) => {
  if (!parentNamespace.parent) {
    const namespaceElements = namespaceChain.split('.');
    const firstOccurrence = namespaceElements.indexOf(typeName);
    const lastOccurrence = namespaceElements.lastIndexOf(typeName);
    return namespaceElements.slice(firstOccurrence, lastOccurrence + 1).join('.');
  } // eslint-disable-next-line


  namespaceChain = parentNamespace.name + '.' + namespaceChain;
  return matchingAncestorNamespaceLookup(typeName, parentNamespace.parent, namespaceChain);
};
const walkNamespace = (root, onNamespace, parentNamespace) => {
  // eslint-disable-next-line
  const namespace = parentNamespace ? parentNamespace : root;
  const nestedType = namespace.nested;

  if (nestedType) {
    Object.keys(nestedType).forEach(typeName => {
      const nestedNamespace = root.lookup(`${namespace.fullName}.${typeName}`);

      if (nestedNamespace && isNamespace(nestedNamespace)) {
        onNamespace(nestedNamespace);
        walkNamespace(root, onNamespace, nestedNamespace);
      }
    });
  }
};
const walkServices = (root, onService) => {
  walkNamespace(root, namespace => {
    const nestedNamespaceTypes = namespace.nested;

    if (nestedNamespaceTypes) {
      Object.keys(nestedNamespaceTypes).forEach(nestedTypeName => {
        const fullNamespaceName = namespace.fullName.startsWith('.') ? namespace.fullName.replace('.', '') : namespace.fullName;
        const nestedType = root.lookup(`${fullNamespaceName}.${nestedTypeName}`);

        if (nestedType instanceof protobufjs.Service) {
          const serviceName = [...fullNamespaceName.split('.'), nestedType.name];
          const fullyQualifiedServiceName = serviceName.join('.');
          onService(nestedType, serviceName.pop(), fullyQualifiedServiceName);
        }
      });
    }
  });
};
;// CONCATENATED MODULE: ../../../stores/proto-registry/src/proto.registry.ts
function proto_registry_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class ProtoRegistry extends external_events_.EventEmitter {
  constructor(url) {
    super();

    proto_registry_defineProperty(this, "client", void 0);

    proto_registry_defineProperty(this, "root", null);

    proto_registry_defineProperty(this, "schema", {});

    this.client = new GrpcHttpProxyClient(url);
  }

  getRoot() {
    return this.root;
  }

  getSchema() {
    return this.schema;
  }

  async loadDescriptorProtos() {
    const {
      listServicesResponse
    } = await this.client.call('grpc.reflection.v1alpha.ServerReflection', 'ServerReflectionInfo', {
      listServices: 'true'
    });
    const fileDescriptorResponses = await Promise.all(listServicesResponse.service.filter(service => service.name !== 'grpc.reflection.v1alpha.ServerReflection').map(service => this.client.call('grpc.reflection.v1alpha.ServerReflection', 'ServerReflectionInfo', {
      fileContainingSymbol: service.name
    })));
    return fileDescriptorResponses.map(response => response.fileDescriptorResponse.fileDescriptorProto).flat();
  }

  getDescriptorRoot(fileDescriptorProtos) {
    const descriptorSet = descriptor_default().FileDescriptorSet.create();
    fileDescriptorProtos.forEach((descriptorByte, index) => {
      lodash_set_default()(descriptorSet, `file[${index}]`, descriptor_default().FileDescriptorProto.decode(descriptorByte));
    }); // @ts-ignore

    return protobufjs.Root.fromDescriptor(descriptorSet);
  }

  async load() {
    const fileDescriptorProtos = await this.loadDescriptorProtos();
    const root = this.getDescriptorRoot(fileDescriptorProtos);
    const schema = {};
    walkServices(root, (service, name, fullName) => {
      schema[name] = {
        name,
        fullName,
        methods: buildServiceMethods(service)
      };
    });
    this.root = root;
    this.schema = schema;
    this.emit('load', this);
  }

}
;// CONCATENATED MODULE: ../../../stores/proto-registry/src/proto-registry.provider.tsx






const ProtoRegistryProvider = ({
  url,
  children
}) => {
  const registry = (0,external_react_.useMemo)(() => new ProtoRegistry(url), [url]);
  (0,external_react_.useEffect)(() => {
    registry.load();
  }, [registry]);
  return /*#__PURE__*/jsx_runtime_.jsx(Provider, {
    value: registry,
    children: children
  });
};
;// CONCATENATED MODULE: ../../../stores/proto-registry/src/use-schema.hook.ts




const useSchema = () => {
  const registry = (0,external_react_.useContext)(Context);
  const {
    0: schema,
    1: setSchema
  } = (0,external_react_.useState)(registry.getSchema());
  (0,external_react_.useEffect)(() => {
    const onLoad = () => setSchema(registry.getSchema());

    registry.on('load', onLoad);
    return () => {
      registry.off('load', onLoad);
    };
  }, [registry]);
  return schema;
};
;// CONCATENATED MODULE: ../../../stores/proto-registry/src/use-client.hook.ts


const useClient = () => (0,external_react_.useContext)(Context).client;
;// CONCATENATED MODULE: ../../../stores/proto-registry/src/use-root.hook.ts




const useRoot = () => {
  const registry = (0,external_react_.useContext)(Context);
  const {
    0: root,
    1: setRoot
  } = (0,external_react_.useState)(registry.getRoot());
  (0,external_react_.useEffect)(() => {
    const onLoad = () => setRoot(registry.getRoot());

    registry.on('load', onLoad);
    return () => {
      registry.off('load', onLoad);
    };
  }, [registry]);
  return root;
};
;// CONCATENATED MODULE: ../../../stores/proto-registry/src/use-service-method-request-type.hook.ts



const useServiceMethodRequestType = (service, method) => {
  const root = useRoot();
  return (0,external_react_.useMemo)(() => {
    let messageType;

    if (root) {
      walkServices(root, (svc, name) => {
        Object.keys(svc.methods).forEach(mtd => {
          if (service === name && method === mtd) {
            messageType = root.lookupType(svc.methods[mtd].requestType);
          }
        });
      });
    }

    return messageType;
  }, [service, method, root]);
};
;// CONCATENATED MODULE: ../../../stores/proto-registry/src/index.ts









;// CONCATENATED MODULE: ../../../stores/data-registry/src/schema.utils.ts
function schema_utils_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function schema_utils_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { schema_utils_ownKeys(Object(source), true).forEach(function (key) { schema_utils_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { schema_utils_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function schema_utils_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getSchemaFieldData = field => {
  if (Array.isArray(field)) {
    return field.map(getSchemaFieldData);
  }

  const keys = Object.keys(field);

  if (keys.includes('type') && keys.includes('name') && keys.includes('value')) {
    return field.value;
  } // eslint-disable-next-line @typescript-eslint/no-use-before-define


  return getSchemaData(field);
};
const getSchemaData = (input = {}) => Object.keys(input).reduce((result, key) => schema_utils_objectSpread(schema_utils_objectSpread({}, result), {}, {
  [key]: getSchemaFieldData(input[key])
}), {});
;// CONCATENATED MODULE: ../../../stores/data-registry/src/data.registry.ts
function data_registry_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class DataRegistry extends external_events_.EventEmitter {
  constructor(...args) {
    super(...args);

    data_registry_defineProperty(this, "data", new Map());
  }

  load(root) {
    walkServices(root, (service, name, fullName) => {
      Object.keys(service.methods).forEach(method => {
        const messageType = root.lookupType(service.methods[method].requestType);
        this.setServiceMethodData(name, method, getSchemaData(buildTypeFields(messageType)));
      });
    });
    this.emit('load', this);
  }

  setServiceMethodData(service, method, data) {
    var _this$data$get;

    if (!this.data.has(service)) {
      this.data.set(service, new Map());
    }

    (_this$data$get = this.data.get(service)) === null || _this$data$get === void 0 ? void 0 : _this$data$get.set(method, data);
  }

  getServiceMethodData(service, method) {
    var _this$data$get2;

    return (_this$data$get2 = this.data.get(service)) === null || _this$data$get2 === void 0 ? void 0 : _this$data$get2.get(method);
  }

}
const dataRegistry = new DataRegistry();
;// CONCATENATED MODULE: ../../../stores/data-registry/src/data-registry.context.ts

const data_registry_context_Context = /*#__PURE__*/(0,external_react_.createContext)(null);
const {
  Provider: data_registry_context_Provider,
  Consumer: data_registry_context_Consumer
} = data_registry_context_Context;
;// CONCATENATED MODULE: ../../../stores/data-registry/src/data-registry.provider.tsx







const DataRegistryProvider = ({
  children
}) => {
  const registry = (0,external_react_.useMemo)(() => new DataRegistry(), []);
  const root = useRoot();
  (0,external_react_.useEffect)(() => {
    if (root) {
      registry.load(root);
    }
  }, [root, registry]);
  return /*#__PURE__*/jsx_runtime_.jsx(data_registry_context_Provider, {
    value: registry,
    children: children
  });
};
;// CONCATENATED MODULE: ../../../stores/data-registry/src/use-data-registry.hook.ts


const useDataRegistry = () => (0,external_react_.useContext)(data_registry_context_Context);
;// CONCATENATED MODULE: ../../../stores/data-registry/src/index.ts




// EXTERNAL MODULE: ../../../../.yarn/__virtual__/react-router-dom-virtual-cc8ab3c863/0/cache/react-router-dom-npm-6.0.0-beta.0-3798eecb43-d01e019649.zip/node_modules/react-router-dom/main.js
var react_router_dom_main = __webpack_require__(5388);
// EXTERNAL MODULE: ../../../../.yarn/cache/@atls-ui-proto-layout-npm-0.0.1-9e12ea936d-4d9e92f27a.zip/node_modules/@atls-ui-proto/layout/dist/index.js
var layout_dist = __webpack_require__(9034);
// EXTERNAL MODULE: ../../../../.yarn/cache/@atls-ui-proto-text-npm-0.0.1-29d792505e-d99d10d1ec.zip/node_modules/@atls-ui-proto/text/dist/index.js
var text_dist = __webpack_require__(2848);
;// CONCATENATED MODULE: ../../../fragments/sidebar-fragment/src/sidebar.component.tsx









const Sidebar = () => {
  const {
    params
  } = (0,react_router_dom_main.useMatch)('/:service/:method') || {};
  const schema = useSchema();
  return /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Column, {
    py: 24,
    children: Object.keys(schema).map(service => /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(layout_dist.Column, {
        pb: 16,
        children: [/*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
          px: 16,
          pb: "8px",
          children: /*#__PURE__*/jsx_runtime_.jsx(text_dist.Text, {
            fontSize: 16,
            children: service
          })
        }), Object.keys(schema[service].methods).map(method => /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
          px: 16,
          py: "2px",
          children: /*#__PURE__*/jsx_runtime_.jsx(text_dist.Text, {
            as: react_router_dom_main.Link,
            to: `/${service}/${method}`,
            style: {
              textDecoration: 'none'
            },
            fontWeight: (params === null || params === void 0 ? void 0 : params.service) === service && (params === null || params === void 0 ? void 0 : params.method) === method ? 600 : 400,
            children: method
          })
        }, method))]
      })
    }, service))
  });
};
;// CONCATENATED MODULE: ../../../fragments/sidebar-fragment/src/index.ts

// EXTERNAL MODULE: ../../../../.yarn/__virtual__/react-ace-virtual-8b930e7201/0/cache/react-ace-npm-9.4.0-c0e2dac510-9bc4ea498d.zip/node_modules/react-ace/lib/index.js
var lib = __webpack_require__(8988);
// EXTERNAL MODULE: ../../../../.yarn/cache/ace-builds-npm-1.4.12-21c53adb55-009f999a25.zip/node_modules/ace-builds/src-noconflict/mode-json.js
var mode_json = __webpack_require__(4870);
// EXTERNAL MODULE: ../../../../.yarn/cache/ace-builds-npm-1.4.12-21c53adb55-009f999a25.zip/node_modules/ace-builds/src-noconflict/theme-textmate.js
var theme_textmate = __webpack_require__(4833);
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/response/response.component.tsx






const Response = ({
  data = {}
}) => {
  const value = (0,external_react_.useMemo)(() => JSON.stringify(data, null, 2), [data]);
  return /*#__PURE__*/jsx_runtime_.jsx(lib/* default */.ZP, {
    style: {
      background: '#fff'
    },
    width: "100%",
    height: "100%",
    mode: "json",
    theme: "textmate",
    name: "response",
    fontSize: 13,
    cursorStart: 2,
    showPrintMargin: false,
    showGutter: true,
    highlightActiveLine: false,
    value: value,
    readOnly: true,
    setOptions: {
      useWorker: false,
      displayIndentGuides: true
    },
    tabSize: 2
  });
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/response/index.ts

;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/request-type.component.tsx



/* eslint-disable jsx-a11y/label-has-associated-control */





const RequestType = ({
  type,
  onChange
}) => /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Box, {
  width: "100%",
  borderTop: "1px solid black",
  pl: 36,
  background: "white",
  children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(layout_dist.Row, {
    alignItems: "center",
    children: [/*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      children: /*#__PURE__*/jsx_runtime_.jsx(text_dist.Text, {
        children: "Type:"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      flexBasis: 12
    }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      children: /*#__PURE__*/jsx_runtime_.jsx("input", {
        id: "request-form",
        type: "checkbox",
        name: "form",
        value: "form",
        checked: type === 'form',
        onChange: () => onChange('form')
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      pl: "4px",
      children: /*#__PURE__*/jsx_runtime_.jsx("label", {
        htmlFor: "request-form",
        children: /*#__PURE__*/jsx_runtime_.jsx(text_dist.Text, {
          children: "Form"
        })
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      flexBasis: 12
    }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      children: /*#__PURE__*/jsx_runtime_.jsx("input", {
        id: "request-json",
        type: "checkbox",
        name: "json",
        value: "json",
        checked: type === 'json',
        onChange: () => onChange('json')
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      pl: "4px",
      children: /*#__PURE__*/jsx_runtime_.jsx("label", {
        htmlFor: "request-json",
        children: /*#__PURE__*/jsx_runtime_.jsx(text_dist.Text, {
          children: "JSON"
        })
      })
    })]
  })
});
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/json/json-request.component.tsx









const JsonRequest = ({
  service,
  method
}) => {
  const {
    0: value,
    1: setValue
  } = (0,external_react_.useState)(JSON.stringify({}, null, 2));
  const dataRegistry = useDataRegistry();
  (0,external_react_.useEffect)(() => {
    if (service && method) {
      const data = dataRegistry.getServiceMethodData(service, method);

      if (data) {
        setValue(JSON.stringify(data, null, 2));
      }
    }
  }, [service, method, setValue, dataRegistry]);
  const onChangeValue = (0,external_react_.useCallback)(changed => {
    setValue(changed);

    try {
      dataRegistry.setServiceMethodData(service, method, JSON.parse(changed));
    } catch {} // eslint-disable-line no-empty

  }, [service, method, setValue, dataRegistry]);
  return /*#__PURE__*/jsx_runtime_.jsx(lib/* default */.ZP, {
    style: {
      background: '#fff'
    },
    width: "100%",
    height: "100%",
    mode: "json",
    theme: "textmate",
    name: "request",
    fontSize: 13,
    cursorStart: 2,
    onChange: onChangeValue,
    showPrintMargin: false,
    showGutter: true,
    highlightActiveLine: false,
    value: value,
    setOptions: {
      useWorker: false,
      displayIndentGuides: true
    },
    tabSize: 2
  });
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/json/index.ts

// EXTERNAL MODULE: ../../../fragments/editor-fragment/src/request/form/form/form.interfaces.ts
var form_interfaces = __webpack_require__(8747);
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/form/form.store.ts
function form_store_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class FormStore extends external_events_.EventEmitter {
  constructor(data) {
    super();

    form_store_defineProperty(this, "data", {});

    this.data = data;
  }

  static create(data) {
    return new FormStore(data);
  }

  getData() {
    return this.data;
  }

  setValue(path, value) {
    lodash_set_default()(this.data, path, value);
    this.emit('change', this.data);
  }

}
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/form/form.context.ts


const form_context_Context = /*#__PURE__*/(0,external_react_.createContext)(FormStore.create({}));
const {
  Provider: form_context_Provider,
  Consumer: form_context_Consumer
} = form_context_Context;
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/form/form.component.tsx






const Form = ({
  data = {},
  children,
  onChange
}) => {
  const store = (0,external_react_.useMemo)(() => FormStore.create(data), [data]);
  (0,external_react_.useEffect)(() => {
    store.on('change', onChange);
    return () => {
      store.off('change', onChange);
    };
  }, [store, onChange]);
  return /*#__PURE__*/jsx_runtime_.jsx(form_context_Provider, {
    value: store,
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: '100%',
        width: '100%',
        paddingTop: 16,
        paddingLeft: 36,
        paddingRight: 36,
        paddingBottom: 36,
        boxSizing: 'border-box'
      },
      children: children
    })
  });
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/form/use-form.hook.ts


const useForm = () => {
  const store = (0,external_react_.useContext)(form_context_Context);
  return store;
};
// EXTERNAL MODULE: ../../../../.yarn/cache/lodash.get-npm-4.4.2-7bda64ed87-e403047ddb.zip/node_modules/lodash.get/index.js
var lodash_get = __webpack_require__(1375);
var lodash_get_default = /*#__PURE__*/__webpack_require__.n(lodash_get);
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/form/use-field.hook.ts




const useField = path => {
  const form = useForm();

  if (!form) {
    throw new Error('Missing <FormProvider>');
  }

  const {
    0: value,
    1: setValue
  } = (0,external_react_.useState)(lodash_get_default()(form.getData(), path));
  const onChange = (0,external_react_.useCallback)(event => {
    if (event && event.target) {
      setValue(event.target.value);
      form.setValue(path, event.target.value);
    } else {
      setValue(event);
      form.setValue(path, event);
    }
  }, [form, path, setValue]);
  return [value, onChange];
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/form/index.ts





// EXTERNAL MODULE: ../../../../.yarn/__virtual__/@atls-ui-proto-button-virtual-8d3fe863d5/0/cache/@atls-ui-proto-button-npm-0.0.1-b511472e50-e970d6405d.zip/node_modules/@atls-ui-proto/button/dist/index.js
var button_dist = __webpack_require__(3455);
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/fields/repeated.field.tsx











const RepeatedField = ({
  name,
  path,
  children
}) => {
  const [value = [], onChange] = useField(path);
  const onAdd = (0,external_react_.useCallback)(() => {
    if (value.length > 0) {
      onChange([...value, value[0]]);
    }
  }, [value, onChange]);
  const onRemove = (0,external_react_.useCallback)(index => {
    onChange(value.filter((_, i) => index === i));
  }, [value, onChange]);
  const items = (0,external_react_.useMemo)(() => value.map((child, index) => /*#__PURE__*/(0,jsx_runtime_.jsxs)(layout_dist.Row, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      children: children([...path, index])
    }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      pl: 16,
      pt: 36,
      children: index > 0 && /*#__PURE__*/jsx_runtime_.jsx(button_dist.Button, {
        size: "small",
        inverted: true,
        style: {
          borderWidth: 0
        },
        onClick: () => onRemove(index),
        children: "-"
      })
    })]
  })), [children, value, path, onRemove]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(layout_dist.Column, {
    pt: 20,
    children: [/*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      pl: (path.length - 1) * 16,
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(layout_dist.Row, {
        alignItems: "center",
        children: [/*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
          children: /*#__PURE__*/jsx_runtime_.jsx(text_dist.Text, {
            fontWeight: 700,
            children: name
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
          children: /*#__PURE__*/jsx_runtime_.jsx(button_dist.Button, {
            size: "small",
            inverted: true,
            style: {
              borderWidth: 0
            },
            onClick: onAdd,
            children: "+"
          })
        })]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      children: /*#__PURE__*/jsx_runtime_.jsx("div", {
        style: {
          width: '100%'
        },
        children: items
      })
    })]
  });
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/fields/constants.ts
const NUMBER_TYPES = ['number', 'int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'fixed32', 'fixed64', 'sfixed32', 'sfixed64', 'double', 'float'];
const TEXT_TYPES = ['string'];
const BOOLEAN_TYPES = ['bool'];
const BYTES_TYPES = ['butes'];
const SCALAR_TYPES = [...NUMBER_TYPES, ...TEXT_TYPES, ...BOOLEAN_TYPES, ...BYTES_TYPES];
// EXTERNAL MODULE: ../../../../.yarn/__virtual__/@atls-ui-proto-input-virtual-4044348d9f/0/cache/@atls-ui-proto-input-npm-0.0.1-3a45b6bbee-76a1d1302a.zip/node_modules/@atls-ui-proto/input/dist/index.js
var input_dist = __webpack_require__(9514);
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/fields/input.field.tsx



function input_field_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function input_field_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { input_field_ownKeys(Object(source), true).forEach(function (key) { input_field_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { input_field_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function input_field_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }








const Control = (_ref) => {
  let {
    type,
    value,
    onChange
  } = _ref,
      props = _objectWithoutProperties(_ref, ["type", "value", "onChange"]);

  if (type === 'checkbox') {
    return /*#__PURE__*/jsx_runtime_.jsx("input", input_field_objectSpread(input_field_objectSpread({}, props), {}, {
      type: type,
      value: value,
      checked: value,
      onChange: () => onChange(!value)
    }));
  }

  return /*#__PURE__*/jsx_runtime_.jsx(input_dist.Input, input_field_objectSpread(input_field_objectSpread({}, props), {}, {
    type: type,
    size: "small",
    value: value,
    onChange: onChange
  }));
};

const InputField = ({
  type = 'text',
  name,
  path
}) => {
  const [value, onChange] = useField(path);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(layout_dist.Column, {
    pt: 12,
    pl: (path.length - 1) * 16,
    children: [/*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      pb: "4px",
      children: /*#__PURE__*/jsx_runtime_.jsx(text_dist.Text, {
        children: name
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      children: /*#__PURE__*/jsx_runtime_.jsx(Control, {
        type: type,
        value: value,
        onChange: onChange
      })
    })]
  });
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/fields/scalar.field.tsx







const ScalarField = ({
  field,
  path
}) => {
  if (TEXT_TYPES.includes(field.type)) {
    return /*#__PURE__*/jsx_runtime_.jsx(InputField, {
      name: field.name,
      path: path
    });
  }

  if (BOOLEAN_TYPES.includes(field.type)) {
    return /*#__PURE__*/jsx_runtime_.jsx(InputField, {
      type: "checkbox",
      name: field.name,
      path: path
    });
  }

  if (BYTES_TYPES.includes(field.type)) {
    return /*#__PURE__*/jsx_runtime_.jsx(InputField, {
      name: field.name,
      path: path
    });
  }

  if (NUMBER_TYPES.includes(field.type)) {
    return /*#__PURE__*/jsx_runtime_.jsx(InputField, {
      type: "number",
      name: field.name,
      path: path
    });
  }

  return null;
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/fields/group.field.tsx






const GroupField = ({
  name,
  path,
  children
}) => /*#__PURE__*/(0,jsx_runtime_.jsxs)(layout_dist.Column, {
  pt: 24,
  children: [/*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
    children: /*#__PURE__*/jsx_runtime_.jsx(text_dist.Text, {
      fontWeight: 700,
      children: name
    })
  }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      style: {
        width: '100%'
      },
      children: children
    })
  })]
});
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/fields/enum.field.tsx



const EnumField = ({
  field,
  path = []
}) => {
  const [value, onChange] = useField(path);
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    style: {
      padding: '16px 16px'
    },
    children: /*#__PURE__*/jsx_runtime_.jsx("select", {
      onChange: onChange,
      children: Object.keys(field.values).map(label => /*#__PURE__*/jsx_runtime_.jsx("option", {
        value: field.values[label],
        selected: field.values[label] === value,
        children: label
      }))
    })
  });
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/fields/type.field.tsx



/* eslint-disable @typescript-eslint/no-use-before-define */










const RepeatedTypeField = ({
  field,
  path
}) => /*#__PURE__*/jsx_runtime_.jsx(RepeatedField, {
  name: field.name,
  path: path,
  children: childPath => {
    var _field$resolvedType;

    return field.resolvedType ? /*#__PURE__*/jsx_runtime_.jsx(TypeFields, {
      path: childPath,
      fields: (_field$resolvedType = field.resolvedType) === null || _field$resolvedType === void 0 ? void 0 : _field$resolvedType.fieldsArray
    }, childPath.join('.')) : /*#__PURE__*/jsx_runtime_.jsx(TypeField, {
      field: field,
      path: childPath
    }, childPath.join('.'));
  }
});

const TypeFields = ({
  fields = [],
  path = []
}) => {
  const nodes = fields.reduce((result, field) => {
    field.resolve();

    if (field.parent !== field.resolvedType) {
      const fieldPath = [...path, field.name];
      const key = fieldPath.join('.');

      if (field.repeated) {
        result.push( /*#__PURE__*/jsx_runtime_.jsx(RepeatedTypeField, {
          field: field,
          path: fieldPath
        }, key));
      } else {
        result.push( /*#__PURE__*/jsx_runtime_.jsx(TypeField, {
          field: field,
          path: fieldPath
        }, key));
      }
    }

    return result;
  }, []);
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: nodes
  });
};

const TypeField = ({
  field,
  path = []
}) => {
  const key = path.join('.');

  if (field instanceof protobufjs.MapField) {
    return /*#__PURE__*/jsx_runtime_.jsx("div", {
      style: {
        padding: '16px 0px'
      },
      children: "Not implemented"
    });
  }

  if (field.resolvedType instanceof protobufjs.Type) {
    var _field$resolvedType2;

    return /*#__PURE__*/jsx_runtime_.jsx(GroupField, {
      name: field.name,
      path: path,
      children: /*#__PURE__*/jsx_runtime_.jsx(TypeFields, {
        fields: (_field$resolvedType2 = field.resolvedType) === null || _field$resolvedType2 === void 0 ? void 0 : _field$resolvedType2.fieldsArray,
        path: path
      })
    }, key);
  }

  if (field.resolvedType instanceof protobufjs.Enum) {
    // @ts-ignore
    return /*#__PURE__*/jsx_runtime_.jsx(EnumField, {
      field: field.resolvedType,
      path: path
    }, key);
  }

  if (SCALAR_TYPES.includes(field.type)) {
    return /*#__PURE__*/jsx_runtime_.jsx(ScalarField, {
      field: field,
      path: path
    }, key);
  }

  return /*#__PURE__*/jsx_runtime_.jsx(TypeField, {
    field: field.resolve(),
    path: path
  }, key);
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/fields/index.ts

;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/form-request.component.tsx






const FormRequest = ({
  service,
  method
}) => {
  const messageType = useServiceMethodRequestType(service, method);
  const dataRegistry = useDataRegistry();
  const onChange = (0,external_react_.useCallback)(data => {
    dataRegistry.setServiceMethodData(service, method, data);
  }, [service, method, dataRegistry]);

  if (!messageType) {
    return null;
  }

  return /*#__PURE__*/jsx_runtime_.jsx(Form, {
    data: dataRegistry.getServiceMethodData(service, method),
    onChange: onChange,
    children: /*#__PURE__*/jsx_runtime_.jsx(TypeFields, {
      fields: messageType.fieldsArray
    })
  });
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/form/index.ts

;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/request.component.tsx



function request_component_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function request_component_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { request_component_ownKeys(Object(source), true).forEach(function (key) { request_component_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { request_component_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function request_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const Request = props => {
  const {
    0: type,
    1: setType
  } = (0,external_react_.useState)('json');
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(dist.Column, {
    height: "100%",
    children: [/*#__PURE__*/jsx_runtime_.jsx(dist.Layout, {
      flexGrow: 1,
      children: /*#__PURE__*/jsx_runtime_.jsx(dist.Box, {
        position: "relative",
        width: "100%",
        overflow: "hidden",
        children: /*#__PURE__*/jsx_runtime_.jsx(dist.Box, {
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          children: type === 'json' ? /*#__PURE__*/jsx_runtime_.jsx(JsonRequest, request_component_objectSpread({}, props)) : /*#__PURE__*/jsx_runtime_.jsx(FormRequest, request_component_objectSpread({}, props))
        })
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(dist.Layout, {
      flexBasis: 48,
      children: /*#__PURE__*/jsx_runtime_.jsx(RequestType, {
        type: type,
        onChange: setType
      })
    })]
  });
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/request/index.ts

;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/use-call.hook.ts




const useCall = (service, method, callback) => {
  const dataRegistry = useDataRegistry();
  const client = useClient();
  const schema = useSchema();
  return (0,external_react_.useCallback)(async () => {
    const {
      fullName
    } = schema[service];
    const data = dataRegistry.getServiceMethodData(service, method);
    const response = await client.call(fullName, method, data);
    callback(response);
  }, [service, method, callback, dataRegistry, client, schema]);
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/call.component.tsx




const Call = ({
  onClick
}) => /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Box, {
  width: "1px",
  position: "relative",
  height: "100%",
  background: "black",
  children: /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Box, {
    position: "absolute",
    top: "50%",
    left: -24,
    zIndex: 99999,
    children: /*#__PURE__*/jsx_runtime_.jsx(button_dist.Button, {
      size: "large",
      shape: "circle",
      onClick: onClick,
      children: "\u25B6"
    })
  })
});
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/editor.component.tsx










const Editor = ({
  service,
  method
}) => {
  const {
    0: response,
    1: setResponse
  } = (0,external_react_.useState)();
  const onCall = useCall(service, method, setResponse);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(dist.Row, {
    height: "100%",
    children: [/*#__PURE__*/jsx_runtime_.jsx(dist.Layout, {
      flexBasis: "50%",
      children: /*#__PURE__*/jsx_runtime_.jsx(Request, {
        service: service,
        method: method
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(dist.Layout, {
      flexBasis: "1px",
      children: /*#__PURE__*/jsx_runtime_.jsx(Call, {
        onClick: onCall
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(dist.Layout, {
      flexBasis: "50%",
      children: /*#__PURE__*/jsx_runtime_.jsx(Response, {
        data: response
      })
    })]
  });
};
;// CONCATENATED MODULE: ../../../fragments/editor-fragment/src/index.ts

;// CONCATENATED MODULE: ../../../fragments/tabs-fragment/src/tab.component.tsx



/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */




const Tab = ({
  service,
  method,
  active,
  onClose
}) => /*#__PURE__*/(0,jsx_runtime_.jsxs)(layout_dist.Box, {
  position: "relative",
  top: "1px",
  borderTop: active ? '1px solid black' : '1px solid transparent',
  borderRight: active ? '1px solid black' : '1px solid transparent',
  borderLeft: active ? '1px solid black' : '1px solid transparent',
  borderTopRightRadius: 4,
  borderTopLeftRadius: 4,
  background: active && 'white',
  boxShadow: "border-box",
  children: [/*#__PURE__*/jsx_runtime_.jsx(text_dist.Text, {
    as: react_router_dom_main.Link,
    to: `/${service}/${method}`,
    style: {
      textDecoration: 'none'
    },
    py: 12,
    pl: 24,
    pr: 12,
    children: method
  }), /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Box, {
    flexDirection: "column",
    justifyContent: "center",
    pr: 12,
    children: /*#__PURE__*/jsx_runtime_.jsx(text_dist.Text, {
      onClick: () => onClose(service, method),
      style: {
        cursor: 'pointer'
      },
      children: "\u2716"
    })
  })]
});
;// CONCATENATED MODULE: ../../../fragments/tabs-fragment/src/tabs.component.tsx


function tabs_component_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function tabs_component_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { tabs_component_ownKeys(Object(source), true).forEach(function (key) { tabs_component_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { tabs_component_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tabs_component_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const Tabs = ({
  service,
  method
}) => {
  const {
    0: tabs,
    1: setTabs
  } = (0,external_react_.useState)([]);
  const navigate = (0,react_router_dom_main.useNavigate)();
  (0,external_react_.useEffect)(() => {
    setTabs(prev => {
      if (prev.find(tab => tab.service === service && tab.method === method)) {
        return prev.map(tab => {
          if (tab.service === service && tab.method === method) {
            return tabs_component_objectSpread(tabs_component_objectSpread({}, tab), {}, {
              active: true
            });
          }

          return tabs_component_objectSpread(tabs_component_objectSpread({}, tab), {}, {
            active: false
          });
        });
      }

      return [{
        service,
        method,
        active: true
      }, ...prev.map(tab => tabs_component_objectSpread(tabs_component_objectSpread({}, tab), {}, {
        active: false
      }))];
    });
  }, [service, method, setTabs]);
  const onClose = (0,external_react_.useCallback)((svc, mtd) => {
    setTabs(prev => {
      const filtered = prev.filter(tab => !(tab.service === svc && tab.method === mtd)); // TODO: move to effect

      if (!filtered.find(tab => tab.active) && filtered[0]) {
        navigate(`/${filtered[0].service}/${filtered[0].method}`);
      }

      return filtered;
    });
  }, [setTabs, navigate]);
  return /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Box, {
    mt: 36,
    width: "100%",
    borderBottom: "1px solid black",
    pl: 16,
    children: tabs.map(tab => /*#__PURE__*/jsx_runtime_.jsx(layout_dist.Layout, {
      children: /*#__PURE__*/jsx_runtime_.jsx(Tab, tabs_component_objectSpread(tabs_component_objectSpread({}, tab), {}, {
        onClose: onClose
      }))
    }, `${tab.service}.${tab.method}`))
  });
};
;// CONCATENATED MODULE: ../../../fragments/tabs-fragment/src/index.ts

;// CONCATENATED MODULE: ../../../pages/index-page/src/loading-state.component.tsx



const LoadingState = ({
  children
}) => {
  const {
    0: loaded,
    1: setLoaded
  } = (0,external_react_.useState)(false);
  const dataRegistry = useDataRegistry();
  (0,external_react_.useEffect)(() => {
    const onLoad = () => setLoaded(true);

    dataRegistry.on('load', onLoad);
    return () => {
      dataRegistry.off('load', onLoad);
    };
  }, [dataRegistry]);

  if (loaded) {
    return children;
  }

  return null;
};
;// CONCATENATED MODULE: ../../../pages/index-page/src/index.page.tsx
















const EditorContainer = () => {
  const {
    params
  } = (0,main.useMatch)('/:service/:method') || {};
  return /*#__PURE__*/jsx_runtime_.jsx(Editor, {
    service: params === null || params === void 0 ? void 0 : params.service,
    method: params === null || params === void 0 ? void 0 : params.method
  });
};

const TabsContainer = () => {
  const {
    params
  } = (0,main.useMatch)('/:service/:method') || {};
  return /*#__PURE__*/jsx_runtime_.jsx(Tabs, {
    service: params === null || params === void 0 ? void 0 : params.service,
    method: params === null || params === void 0 ? void 0 : params.method
  });
};

const IndexPage = () => /*#__PURE__*/jsx_runtime_.jsx(ProtoRegistryProvider, {
  children: /*#__PURE__*/jsx_runtime_.jsx(DataRegistryProvider, {
    children: /*#__PURE__*/jsx_runtime_.jsx(main.HashRouter, {
      children: /*#__PURE__*/jsx_runtime_.jsx(LoadingState, {
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(dist.Row, {
          height: "100%",
          children: [/*#__PURE__*/jsx_runtime_.jsx(dist.Layout, {
            flexBasis: "240px",
            children: /*#__PURE__*/jsx_runtime_.jsx(Sidebar, {})
          }), /*#__PURE__*/jsx_runtime_.jsx(dist.Layout, {
            flexBasis: 1,
            children: /*#__PURE__*/jsx_runtime_.jsx(dist.Box, {
              background: "black",
              width: 1
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(dist.Layout, {
            flexGrow: 1,
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(dist.Column, {
              height: "100%",
              children: [/*#__PURE__*/jsx_runtime_.jsx(dist.Layout, {
                children: /*#__PURE__*/jsx_runtime_.jsx(TabsContainer, {})
              }), /*#__PURE__*/jsx_runtime_.jsx(dist.Layout, {
                flexGrow: 1,
                children: /*#__PURE__*/jsx_runtime_.jsx(EditorContainer, {})
              })]
            })
          })]
        })
      })
    })
  })
});
;// CONCATENATED MODULE: ../../../pages/index-page/src/index.ts


/***/ })

};
;