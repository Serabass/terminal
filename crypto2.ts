
export default class Crypto {
    public static getBCC(buffer:Buffer):number {
        var result:number = buffer.readInt8(0);

        for (var i = 1; i < buffer.length; i++) {
            result ^= buffer.readInt8(i);
        }

        return result;
    }
}