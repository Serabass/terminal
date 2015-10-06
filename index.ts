require('./utils');

import CommandBuilder from './command-builder'
import LCDM2000 from './devices/lcdm2000'
import Settings from './settings2'

var l = new LCDM2000();

console.log(Settings.get());