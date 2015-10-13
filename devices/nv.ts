/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/ssp/ssp.d.ts" />

var ssp:any = require('ssp');

import { Watcher } from "../watch"

export class NV {
    private ssp:SSP;

    private port:string;

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

    public onReadNote(cb:(note:NumberOrString) => {}):NV {
        this.ssp.on('read_note', cb);
        return this;
    }

    public onDisable(cb:Function):NV {
        this.ssp.on('disable', cb);
        return this;
    }

    public onNoteClearedFromFront(cb:(note:NumberOrString) => {}):NV {
        this.ssp.on('note_cleared_from_front', cb);
        return this;
    }

    public onNoteClearedToCashbox(cb:(note:NumberOrString) => {}):NV {
        this.ssp.on('note_cleared_to_cashbox', cb);
        return this;
    }

    public onCreditNote(cb:(note:NumberOrString) => {}):NV {
        this.ssp.on('credit_note', cb);
        return this;
    }

    public onSafeNoteJam(cb:(note:NumberOrString) => {}):NV {
        this.ssp.on('safe_note_jam', cb);
        return this;
    }

    public onUnsafeNoteJam(cb:(note:NumberOrString) => {}):NV {
        this.ssp.on('unsafe_note_jam', cb);
        return this;
    }

    public onFraudAttempt(cb:(note:NumberOrString) => {}):NV {
        this.ssp.on('fraud_attempt', cb);
        return this;
    }

    public onStackerFull(cb:(note:NumberOrString) => {}):NV {
        this.ssp.on('stacker_full', cb);
        return this;
    }

    public onNoteRejected(cb:(note:NumberOrString) => {}):NV {
        this.ssp.on('note_rejected', cb);
        return this;
    }

    public onError(cb:(err:any) => {}):NV {
        this.ssp.on('error', cb);
        return this;
    }

    public watch():Watcher {
        return new Watcher(this);
    }
}
