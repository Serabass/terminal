require('./utils');

import { CommandBuilder } from './command-builder'
import { LCDM2000 } from './devices/lcdm2000'
import { Settings } from './settings2'
import { NV } from './devices/nv'



var l = new LCDM2000();
var nv = new NV({});


console.log(Settings.get());