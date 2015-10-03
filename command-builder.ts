import Command from "./command"

export module CommandBuilder {
    var REGEXP_HEXNUM = /^-?(?:0x[A-F\d]{1,2})$/,
        REGEX_DECNUM  = /^-?[\d]{1,3}$/,
        REGEXP_CMDKEY = /^\.[A-Z\d]{2,3}$/,
        REGEXP_STRING = /^\*\S+?$/
    ;

    class Lambda {
        constructor(public regexp:RegExp, public fn:(x:string)=>void) {}
    }

    export class CommandBuilder {
        public static build(cmd:string, ...params:any[]):Command {
            var result:number[] = [],
                lambdas:Lambda[] = [
                new Lambda(REGEXP_HEXNUM, (x:string) => result.push(parseInt(x, 16))),
                new Lambda(REGEX_DECNUM, (x:string) => result.push(parseInt(x, 10))),
                new Lambda(REGEXP_CMDKEY, (x:string) => {
                    var code:number = Command.codes[x.substr(1)];

                    if (code === void 0)
                        throw new Error(`Command ${x} is not recognized`);

                    result.push(code);
                }),
                new Lambda(REGEXP_STRING, (x:string) => {
                    for (var char of x.substr(1)) {
                        result.push(x.charCodeAt(0));
                    }
                })
            ],
                args:string[] = cmd.split(/\s+/i)
            ;

            if (params.length > 0) {
                var i = 0;
                params.forEach((x:any) => {
                    cmd = cmd.replace(`@${++i}`, x.toString());
                });
            }

            for (var arg of args) {
                for (var lambda of lambdas) {
                    if (lambda.regexp.test(arg)) {
                        lambda.fn(arg);
                        break;
                    }
                }
            }

            return new Command(result);
        }
    }
}