declare class SerialPort {
    constructor(options:any);
    isOpen():boolean;
    open(fn:Function):void;
    write(data:(String | Buffer), callback:(err:any, results:any) => void):void;
    close(fn:Function):void;
}
