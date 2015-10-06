/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/ssp/ssp.d.ts" />

var ssp:any = require('ssp');

export class NV {
    private ssp:SSP;

    constructor(options:{device?:string, type?:string, currencies?:number[]}) {
        this.ssp = new ssp(options);
    }

    init(enableOnInit:boolean, cb:() => {}):NV {
        this.ssp.init(enableOnInit, cb);
        return this;
    }

    enable():NV {
        this.ssp.enable();
        return this;
    }

    disable():NV {
        this.ssp.disable();
        return this;
    }

    onReady(cb:() => {}):NV {
        this.ssp.on('ready', cb);
        return this;
    }

    onReadNote(cb:(note:(number | string)) => {}):NV {
        this.ssp.on('read_note', cb);
        return this;
    }

    onDisable(cb:() => {}):NV {
        this.ssp.on('disable', cb);
        return this;
    }

    onNoteClearedFromFront(cb:(note:(number | string)) => {}):NV {
        this.ssp.on('note_cleared_from_front', cb);
        return this;
    }

    onNoteClearedToCashbox(cb:(note:(number | string)) => {}):NV {
        this.ssp.on('note_cleared_to_cashbox', cb);
        return this;
    }

    onCreditNote(cb:(note:(number | string)) => {}):NV {
        this.ssp.on('credit_note', cb);
        return this;
    }

    onSafeNoteJam(cb:(note:(number | string)) => {}):NV {
        this.ssp.on('safe_note_jam', cb);
        return this;
    }

    onUnsafeNoteJam(cb:(note:(number | string)) => {}):NV {
        this.ssp.on('unsafe_note_jam', cb);
        return this;
    }

    onFraudAttempt(cb:(note:(number | string)) => {}):NV {
        this.ssp.on('fraud_attempt', cb);
        return this;
    }

    onStackerFull(cb:(note:(number | string)) => {}):NV {
        this.ssp.on('stacker_full', cb);
        return this;
    }

    onNoteRejected(cb:(note:(number | string)) => {}):NV {
        this.ssp.on('note_rejected', cb);
        return this;
    }

    onError(cb:(err:any) => {}):NV {
        this.ssp.on('error', cb);
        return this;
    }
}
