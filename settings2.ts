var fs = require('fs');

interface Device {
    name:string;
    baudRate:number;
}

interface DeviceSet {
    [key:string]: Device;
}

export class Settings {

    public static devices:any = null;

    public static getPorts(cb:Function) {
        require("serialport").list(cb);
    }

    public static get(force:boolean = false):any {
        if (this.devices && !force)
            return this.devices;

        return this.devices = (() => {
            var file:string = fs.readFileSync('settings.txt').toString(),
                lines:string[] = file.split(/[\r\n]+/g),
                result:DeviceSet = {}
            ;

            for (let line of lines) {
                let parts:string[] = line.split(';'),
                    port:string = parts[0],
                    name:string = parts[1],
                    baudRate:number = parseInt(parts[2], 10)
                ;

                result[port] = {name, baudRate};
            }

            return result;
        })();
    }
}
