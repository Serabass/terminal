/// <reference path="typings/tsd.d.ts" />

import SerialPort from "serialport"
import Command from "./command"
import Crypto from "./crypto2"
import * as events from "events";

export default class Dev extends events.EventEmitter {
    public port:string;
    public serialPort:SerialPort;
    public name:string;
    public baudRate:number = 9600;
    public bcc:boolean = false;

    constructor() {
        super();
    }

    public isOpen():boolean {
        return this.serialPort.isOpen();
    }

    public init({port, baudRate = this.baudRate}:{port:string, baudRate:number}):Promise<any> {
        return new Promise((resolve:Function, reject:Function) => {
            this.serialPort = new SerialPort({port, baudRate});

            this.serialPort.open(function (err:any) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public getCommands():any {
        return {};
    }

    public buildCommand(name:string, params:{}):Command {
        var command:string = this.getCommands()[name];
        var cmd:Command;

        if ( command === void 0)
            throw new Error(`Command ${name} not found`);

        cmd = command.build<Command>(params);

        if (this.bcc) {
            cmd.bytes = this.appendBCC(cmd.bytes);
        }

        return cmd;
    }

    public appendBCC(data:Buffer):Buffer {
        let bcc:number = Crypto.getBCC(data);
        let arr:Buffer[] = [data, new Buffer([bcc])];
        return Buffer.concat(arr);
    }

    public stop(fn:Function) {
        this.serialPort.close(fn);
    }

    public send(name:any, params:any = {}):Promise<any> {
        var cmd:Command;

        if (name instanceof Command) {
            cmd = name;
        } else {
            cmd = this.buildCommand(name, params);
        }

        return new Promise<any>((reject:Function, resolve:Function) => {
            this.serialPort.write(cmd.bytes, (err:any, results:any):void => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(results);
            });
        });
    }
}