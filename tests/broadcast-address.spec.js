var expect = require('chai').expect;
var broadcastAddress = require('../broadcast-address.js');

describe('broadcast-address', () => {
  it('throws an error for an unknown network interface', () => {
    expect(() => broadcastAddress('123')).to.throw(Error, 'Unknown network interface (123).');
  });
  it('throws an error for an unknown address on a given network interface', () => {
    expect(() => broadcastAddress('lo0', '127.0.0.2')).to.throw(Error, 'No address info found. Specify a valid address.');
  });
  it('works for the local loopback interface with 255.0.0.0 netmask', () => {
    expect(broadcastAddress('lo0')).to.equal('127.255.255.255');
    expect(broadcastAddress('lo0', '127.0.0.1')).to.equal('127.255.255.255');
  });
});
