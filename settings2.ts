
var fs = require('fs');

class Device {
    constructor(public name:string, public baudRate:number) {}
}

export default class Settings {

    public static devices:any = null;

    public static get(force:boolean = false):any {
        if (this.devices && !force)
            return this.devices;

        return this.devices = (() => {
            var file:string = fs.readFileSync('settings.txt').toString();
            var lines:string[] = file.split(/[\r\n]+/g);
            var result:any = {};

            for (let line of lines) {
                let parts:string[] = line.split(';');
                let port:string = parts[0];
                let name:string = parts[1];
                let baudRate:number = parseInt(parts[2], 10);
                result[port] = new Device(name, baudRate);
            }

            return result;
        })();
    }
}
