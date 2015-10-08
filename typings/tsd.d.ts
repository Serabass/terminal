
/// <reference path="node/node.d.ts" />
/// <reference path="es6-promise/es6-promise.d.ts" />
/// <reference path="serialport/serialport.d.ts" />
/// <reference path="ssp/ssp.d.ts" />

interface String {
    build<T>(...params:any[]):T;
}


declare type NVConstructorOptions = {
    device?:string,
    type?:string,
    currencies?:number[],
    baudrate:number
};
declare type NumberOrString = number | string;
declare type PortData = {
    port:string,
    baudRate:number
};
