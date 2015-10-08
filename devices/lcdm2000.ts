/// <reference path="../typings/tsd.d.ts" />

import { Dev } from '../dev';
import { Command } from "../command";

export class LCDM2000 extends Dev {

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
}
