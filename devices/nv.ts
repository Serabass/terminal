/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/ssp/ssp.d.ts" />

var ssp:any = require('ssp');
var fs = require('fs');


import { Watcher } from "../watch"

export class NV {
    private ssp:SSP;

    private port:string;

    public notes:any = {
        1:"200KZT",
        2:"500KZT",
        3:"1000KZT",
        4:"2000KZT",
        5:"5000KZT",
        6:"10000KZT"
    };

    public deviceName:string = 'NV';

    public constructor(options:NVConstructorOptions) {
        this.port = options.device;
        this.ssp = new ssp(options);
    }

    public init(enableOnInit:boolean, cb:Function):NV {
        this.ssp.init(enableOnInit, cb);
        return this;
    }

    public enable(cb:Function):NV {
        this.ssp.enable(cb);
        return this;
    }

    public disable(cb:Function):NV {
        this.ssp.disable(cb);
        return this;
    }

    public onReady(cb:Function):NV {
        this.ssp.on('ready', cb);
        return this;
    }

    public onReadNote(cb:NVNoteCallback):NV {
        this.ssp.on('read_note', cb);
        return this;
    }

    public onDisable(cb:Function):NV {
        this.ssp.on('disable', cb);
        return this;
    }

    public onNoteClearedFromFront(cb:NVNoteCallback):NV {
        this.ssp.on('note_cleared_from_front', cb);
        return this;
    }

    public onNoteClearedToCashbox(cb:NVNoteCallback):NV {
        this.ssp.on('note_cleared_to_cashbox', cb);
        return this;
    }

    public onCreditNote(cb:NVNoteCallback):NV {
        this.ssp.on('credit_note', cb);
        return this;
    }

    public onSafeNoteJam(cb:NVNoteCallback):NV {
        this.ssp.on('safe_note_jam', cb);
        return this;
    }

    public onUnsafeNoteJam(cb:NVNoteCallback):NV {
        this.ssp.on('unsafe_note_jam', cb);
        return this;
    }

    public onFraudAttempt(cb:NVNoteCallback):NV {
        this.ssp.on('fraud_attempt', cb);
        return this;
    }

    public onStackerFull(cb:NVNoteCallback):NV {
        this.ssp.on('stacker_full', cb);
        return this;
    }

    public onNoteRejected(cb:NVNoteCallback):NV {
        this.ssp.on('note_rejected', cb);
        return this;
    }

    public onError(cb:(err:any) => {}):NV {
        this.ssp.on('error', cb);
        return this;
    }

    public initInput() {
        return this.onReadNote((note:NumberOrString) => {
            fs.appendFile(this.getFileName(), this.notes[note], () => {

            });
        });
    }

    public getFileName():string {
        return `${this.port}_${this.deviceName}.txt`
    }

    public watch():Watcher {
        return new Watcher(this);
    }
}
