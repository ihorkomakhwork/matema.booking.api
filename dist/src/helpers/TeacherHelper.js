"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotToTime = exports.findSlotIntervals = void 0;
const configs_1 = __importDefault(require("../configs"));
// find available slot intervals
const findSlotIntervals = (timeSlots) => {
    const intervals = [];
    for (let i = 0; i < timeSlots.length; i++) {
        if (timeSlots[i] % configs_1.default.intervalValue == 0) {
            const hypoIntervalTail = timeSlots[i] + configs_1.default.lessonDuration - 1;
            const intervalTail = timeSlots[i + configs_1.default.lessonDuration - 1];
            if (hypoIntervalTail == intervalTail) {
                intervals.push(timeSlots[i], intervalTail);
            }
        }
    }
    return intervals;
};
exports.findSlotIntervals = findSlotIntervals;
function numberToString(num) {
    if (num < 10) {
        return `0${num}`;
    }
    else {
        return `${num}`;
    }
}
// convert slot to time
// example: 36 -> "03:00"
const slotToTime = (slot) => {
    const hours = Math.floor(slot * 5 / 60);
    const minutes = (slot % 12) * 5;
    let resultTime = numberToString(hours) + ":" + numberToString(minutes);
    return resultTime;
};
exports.slotToTime = slotToTime;
//# sourceMappingURL=TeacherHelper.js.map