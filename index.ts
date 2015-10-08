require('./utils');

import { CommandBuilder } from './command-builder'
import { LCDM2000 } from './devices/lcdm2000'
import { Settings } from './settings2'
import { NV } from './devices/nv'
import { Dev } from './dev'

interface DeviceInfo {
    device?:any
}

function createDevices() {
    var settings:any = Settings.get(),
        devices:any = {};

    for (let port in settings) {
        if ( ! settings.hasOwnProperty(port))
            continue;

        devices[port] = ((port:string):DeviceInfo => {
            var setting:any = settings[port];
            switch (setting.name) {
                case 'LCDM20001':
                case 'LCDM20002':
                    return {
                        device: new LCDM2000({port, baudRate: setting.baudRate})
                    };

                case 'Hopper':
                    return {
                        device: {}
                    };
                    break;

                case 'NV':
                    return {
                        device: new NV({device: port, baudrate: setting.baudRate, type: 'nv9usb'})
                    };

                    break;
            }
        })(port);
    }


    console.log(devices);

}

//createDevices();


Settings.getPorts(function (err:any, ports:any[]) {
    console.log(ports);
});