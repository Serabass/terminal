import { Command } from "./command"
import { CommandBuilder } from './command-builder'

String.prototype.build = function (params:any[]):Command {
    return CommandBuilder.build(this, params);
};
