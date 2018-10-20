/**
 * @module broadcast-address 
 */

'use strict'

var os = require('os');
var hasInterface = require('has-deep-value').hasDeepValue;
var allInterfaces = os.networkInterfaces();
var addr_info;

module.exports = function broadcastAddress(int = 'en0', address) {
  if(!hasInterface(allInterfaces, int)) {
    throw new Error(`Unknown network interface (${int}).`);
  }

  // if an address is given, look it up under the given network interface
  // otherwise just get the first IPv4 occurence for that network interface
  if(address) {
    addr_info = allInterfaces[int].find(e => e.address === address);
  } else {
    addr_info = allInterfaces[int].find(e => e.family === 'IPv4');
  }

  if(!addr_info) {
    throw new Error(`No address info found. Specify a valid address.`);
  }

  var addr_splitted = addr_info.address.split('.');
  var netmask_splitted = addr_info.netmask.split('.');
  // bitwise OR over the splitted NAND netmask, then glue them back together with a dot character to form an ip
  // we have to do a NAND operation because of the 2-complements; getting rid of all the 'prepended' 1's with & 0xFF
  return addr_splitted.map((e, i) => (~netmask_splitted[i] & 0xFF) | e).join('.');
}
