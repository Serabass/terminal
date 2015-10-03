/// <reference path="typings/tsd.d.ts" />

import SerialPort from "serialport"
import Command from "./command"
import BCC from "./bcc"
import Utils from "./utils"

export module Dev {
    export class Dev {
        public port:string;
        public serialPort:SerialPort;
        public name:string;
        public baudRate:number = 9600;
        public bcc:boolean = false;

        constructor() {

        }

        public isOpen():boolean {
            return this.serialPort.isOpen();
        }

        public init(port:string, baudRate:number = this.baudRate):Promise<any> {
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

        public stop() {}

        public send(name:string, ...params:any[]):void {

            var command:string = this.getCommands()[name];

            if ( command === void 0)
                throw new Error(`Command ${name} not found`);

            var cmd:Command = Utils.build(command, ...params);

            if (this.bcc) {
                cmd.bytes.push(BCC.build(cmd.bytes));
            }

            /// ...logic
        }
    }
}