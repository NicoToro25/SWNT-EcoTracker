"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectTransport = exports.detectFood = exports.ACTIVITY_DETECTORS = void 0;
const food_detector_1 = require("./food.detector");
const transport_detector_1 = require("./transport.detector");
exports.ACTIVITY_DETECTORS = [food_detector_1.detectFood, transport_detector_1.detectTransport];
var food_detector_2 = require("./food.detector");
Object.defineProperty(exports, "detectFood", { enumerable: true, get: function () { return food_detector_2.detectFood; } });
var transport_detector_2 = require("./transport.detector");
Object.defineProperty(exports, "detectTransport", { enumerable: true, get: function () { return transport_detector_2.detectTransport; } });
//# sourceMappingURL=index.js.map