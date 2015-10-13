/// <reference path="../typings/tsd.d.ts" />

import { Dev } from '../dev';
import { Command } from "../command";

var fs = require('fs');

export class LCDM2000 extends Dev {

    public deviceName:string = 'LCDM2000';

    private _levels:any = {
        u: 0x45,
        l: 0x55,
        both : 0x56
    };

    private _id:number = 0x01;

    public getCommands():any {
        return {
            dispense       : [
                '.EOT'          ,
                '@id'           ,
                '.STX'          ,
                '@level'        ,
                '@decimals'     ,
                '@bill'         ,
                '.ETX'
            ].join(' '),
            dispenseBoth   : [
                '.EOT'          ,
                '@id'           ,
                '.STX'          ,
                '@level'        ,
                '@uDecimals'    ,
                '@uBill'        ,
                '@lDecimals'    ,
                '@lBill'        ,
                '.ETX'
            ].join(' '),
        };
    }

    public buildDispense(level:string, count:number):Command {

        var bill:number,
            decimals:number,
            lvl:number = this._levels[level]
        ;

        decimals = Math.floor(count / 10) + 0x30;
        bill = (count % 10) + 0x30;

        return this.buildCommand('dispense', {
            level: lvl,
            decimals,
            bill,
            id: this._id
        });
    }

    public runDispense(level:string, count:number):Promise<any> {
        var cmd:Command = this.buildDispense(level, count);
        return this.send(cmd);
    }

    public initWatcher() {
        this
            .watch()
                .init()
                .onChange(() => {
                    var filename:string = this.getFileName(),
                        fileContents:string = fs.readFileSync(filename).toString('utf-8'),
                        lines:number[] = fileContents
                            .split(/[\r\n]+/)
                            .map((line) => parseInt(line, 10))
                    ;

                    switch (lines.length) {
                        case 1:
                            if ( ! isNaN(lines[0])) {
                                this.buildDispense('u', lines[0]);
                            }
                            break;
                        case 2:
                            if ( ! isNaN(lines[0])) {
                                this.buildDispense('u', lines[0]);
                            }
                            if ( ! isNaN(lines[1])) {
                                this.buildDispense('l', lines[1]);
                            }
                            break;
                    }
                });
    }
}
