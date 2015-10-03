declare module "serialport" {
    declare class SerialPort {
        constructor(options:any);
        isOpen():boolean;
        open(fn:Function):void;
    }
}
