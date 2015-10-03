export default class BCC {
    static build(bytes:Buffer):number {
        var result:number = bytes[0];

        for (var i = 1; i < bytes.length; i++) {
            result ^= bytes.readInt8(i);
        }

        return result;
    }
}
