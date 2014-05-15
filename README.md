External auth script for ejabberd in NodeJS

Register event listeners for each auth operation that you want to hook.  
List of operations can be found at [Ejabberd Developers Guide](http://www.ejabberd.im/files/doc/dev.html#htoc8)

For example:

````javascript
var ejabberd = require('ejabberd-auth-js');
ejabberd.on('auth', function(User, Server, Password) {
  //You shall not pass
  ejabberd.failure();
});
````

**failure()** and **success()** are the only available responses you can send.

Any operation that you don't hook into shall fail when requested by ejabberd
