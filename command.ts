/// <reference path="typings/tsd.d.ts" />

export class Command {
    /**
     * http://www.december.com/html/spec/ascii.html
     * NUL	null
     * SOH	start of heading
     * STX	start of text
     * ETX	end of text
     * EOT	end of transmission
     * ENQ	enquiry
     * ACK	acknowledge
     * BEL	bell
     * BS	backspace
     * HT	horizontal tab
     * NL	new line (or LF, line feed)
     * VT	vertical tab
     * NP	new page (or FF, form feed)
     * CR	carriage return
     * SO	shift out
     * SI	shift in
     * DLE	data link escape
     * DC1	device control 1
     * DC2	device control 2
     * DC3	device control 3
     * DC4	device control 4
     * NAK	negative acknowledge
     * SYN	synchronous idle
     * ETB	end of transmission block
     * CAN	cancel
     * EM	end of medium
     * SUB	substitute
     * ESC	escape
     * FS	file separator
     * GS	group separator
     * RS	record separator
     * US	unit separator
     * SP	space
     **/
    public static codes:any = {
        "NUL": 0x00,
        "SOH": 0x01,
        "STX": 0x02,
        "ETX": 0x03,
        "EOT": 0x04,
        "ENQ": 0x05,
        "ACK": 0x06,
        "BEL": 0x07,
        "BS": 0x08,
        "HT": 0x09,
        "NL": 0x0A,
        "VT": 0x0B,
        "NP": 0x0C,
        "CR": 0x0D,
        "SO": 0x0E,
        "SI": 0x0F,
        "DLE": 0x10,
        "DC1": 0x11,
        "DC2": 0x12,
        "DC3": 0x13,
        "DC4": 0x14,
        "NAK": 0x15,
        "SYN": 0x16,
        "ETB": 0x17,
        "CAN": 0x18,
        "EM": 0x19,
        "SUB": 0x1A,
        "ESC": 0x1B,
        "FS": 0x1C,
        "GS": 0x1D,
        "RS": 0x1E,
        "US": 0x1F,
        "SP": 0x20,
        "DEL": 0x7F
    };

    constructor(public bytes:Buffer) {}

    public toString():string {
        var res:string[] = [];


        for (var i = 0; i < this.bytes.length; i++) {
            var b = this.bytes.readInt8(i);
            res.push(`0x${b.toString(16)}`);
        }

        return res.join(' ');
    }
}
