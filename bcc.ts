module BCC {
    export default class BCC {
        public static build(bytes:number[]):number {
            var result:number = bytes[0];

            for (var i = 1; i < bytes.length; i++) {
                result ^= bytes[i];
            }

            return result;
        }
    }
}
