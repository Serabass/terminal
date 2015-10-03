declare module "serialport" {
    export default class SerialPort {
        constructor(options:any);
        isOpen():boolean;
        open(fn:Function):void;
    }
}
