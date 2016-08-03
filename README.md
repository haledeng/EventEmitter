# EventEmitter
Event handler.

### how to use
```
var event = require('event_proxy');

// add event listener
event.on('xxx', function(){});

// remove listener
event.off('xxx');

// trigger event
event.emit('xxx');
```
