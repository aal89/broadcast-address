# broadcast-address

Concise and correct way to calculate the broadcast address for a particular network interface. You can calculate the broadcast address by doing a bitwise OR over
the bit complements of the subnet mask and the selected IP address.

## Install

```sh
$ npm install --save broadcast-address
```

## Usage

`broadcastAddress` takes two parameters of which one is optional (`address`).

* `interface` of type *{string}*: define for which network interface you'd like a broadcast address.
* `address` of type *{string}*: define for which specific address on that `interface` you'd like to calculate the broadcast address from. Picks the first IPv4 address on the network interface if none is given.

The function can also throw errors, namely:

* **Unknown network interface (xyz).** of type *{Error}*: when an unknown network interface was given.
* **No address info found. Specify a valid address.** of type *{Error}*: when no address info could be selected on that interface.


### Examples

```javascript
const broadcastAddress = require('broadcast-address');
 
broadcastAddress('lo0'); //-> 127.255.255.255
broadcastAddress('lo0', '127.0.0.1'); //-> 127.255.255.255
broadcastAddress('en1'); //-> 192.168.178.255
```

*Note: the output is just exemplary.*

### Typescript

Included is an `index.d.ts` file, Typescript should automatically pick this file up and apply the typings across your codebase.

```typescript
import * as broadcastAddress from "broadcast-address";
 
broadcastAddress("lo0"); //-> 127.255.255.255
broadcastAddress("lo0", "127.0.0.1"); //-> 127.255.255.255
broadcastAddress("en1"); //-> 192.168.178.255
```

*Note: the output is just exemplary.*

## License
Copyright © 2018, Alex Burghardt. Made available under the MIT license.
