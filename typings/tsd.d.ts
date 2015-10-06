
/// <reference path="node/node.d.ts" />
/// <reference path="es6-promise/es6-promise.d.ts" />
/// <reference path="serialport/serialport.d.ts" />
/// <reference path="ssp/ssp.d.ts" />

interface String {
    build<T>(...params:any[]):T;
}