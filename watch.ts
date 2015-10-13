var ck = require('chokidar');

export class Watcher {
    constructor(public device:any) {

    }

    public init() {
        console.log(`${this.device.port}_${this.device.deviceName}.txt`);
    }
}
