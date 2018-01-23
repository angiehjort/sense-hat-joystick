## NodeJS Sense Hat Joystick

This module enables you to listen for joystick events (up, down, left, ..) with not external dependencies.

### Example

```js
const Joystick = require("sense-hat-joystick").Joystick;
const joystick = new Joystick();

// possible events: left, right, up, down and enter
joystick.on("left", () => {
	console.log("left pressed");
});
```

Additionally, you can stop listening events by calling `.end()`. The code uses an open file descriptor
to listen for the events, so if you stop listening you can forget about the instance and recreate a new
one if you need events again.
