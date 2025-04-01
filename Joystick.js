"use strict";
const EventEmitter = require("events");
const glob         = require("glob");
const path         = require("path");
const fs           = require("fs");

const EV_KEY  = 1;
const KEY_MAP = {
	103 : "up",
	105 : "left",
	106 : "right",
	108 : "down",
	 28 : "enter",
};

class Joystick extends EventEmitter {
	constructor() {
		super();

		let input;

		try {
			input = glob
			        .sync("/sys/class/input/event*")
			        .filter((input) => (fs.existsSync(path.join(input, "device/name"))))
			        .find((input) => (fs.readFileSync(path.join(input, "device/name")).toString().trim() === "Raspberry Pi Sense HAT Joystick"))
			        .split("/").pop();
		} catch (e) {
			throw new Error("Sense Hat not found");
		}

		let buffer = null;

		this.fd = fs.createReadStream("/dev/input/" + input);

		this.fd.on("data", (data) => {
			buffer = (buffer === null ? data : Buffer.concat([ buffer, data ]));

			while (buffer.length >= 16) {
				this.process(buffer.slice(0, 16));

				buffer = buffer.slice(16);
			}
		});
	}

	process(msg) {
		// if you need the time:
		let type = msg.readUInt16LE(0);
		let code = msg.readUInt16LE(2);
		let value = msg.readUInt16LE(4);

		if (type != EV_KEY) return; // not key press event
		if (value != 1) return;     // 1 - press, 2 - hold, 0 - release
		
		KEY_MAP[code] && this.emit(KEY_MAP[code]);
	}

	end() {
		this.fd.destroy();
	}
}

module.exports = Joystick;
