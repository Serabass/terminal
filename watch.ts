var ck = require('chokidar');
import * as events from "events";

export class Watcher extends events.EventEmitter {
    constructor(public device:any) {
        super();
    }

    public init():Watcher {
        var filename:string = this.device.getFileName();
        var watcher = ck.watch(filename);
        watcher.on('add', () => {
            this.emit('change');
        });
        return this;
    }

    public onChange(cb:Function):Watcher {
        this.on('change', cb);
        return this;
    }
}
