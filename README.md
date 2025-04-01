## NodeJS Sense Hat Joystick

This module enables you to listen for joystick events (up, down, left, ..) with not external dependencies.

### Example

```js
const Joystick = require("./joysticklib.js");
const sense = require("sense-hat-led");

const joystick = new Joystick();
sense.showMessage("test", 0.1)

// possible events: left, right, up, down and enter
joystick.on("left", () => {
    sense.showMessage("left", 0.1)
});

joystick.on("right", () => {
    sense.showMessage("right", 0.1)
});

joystick.on("up", () => {
    sense.showMessage("up", 0.1)
});

joystick.on("down", () => {
    sense.showMessage("down", 0.1)
});

joystick.on("enter", () => {
    sense.showMessage("enter", 0.1)
});
```

Additionally, you can stop listening events by calling `.end()`. The code uses an open file descriptor
to listen for the events, so if you stop listening you can forget about the instance and recreate a new
one if you need events again.
