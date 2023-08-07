import configs from '../configs';

// find available slot intervals
export const findSlotIntervals = (timeSlots: number[]): number[] => {
    const intervals: number[] = [];
    for (let i = 0; i < timeSlots.length; i++) {
        if (timeSlots[i] % configs.intervalValue == 0) {
            const hypoIntervalTail = timeSlots[i] + configs.lessonDuration - 1;
            const intervalTail = timeSlots[i + configs.lessonDuration - 1];
            if (hypoIntervalTail == intervalTail) {
                intervals.push(timeSlots[i], intervalTail);
            }
        }
    }
    return intervals;
}

function numberToString (num: number): string{
    if (num < 10) {
        return `0${num}`;
    } else {
        return `${num}`;
    }
}

// convert slot to time
// example: 36 -> "03:00"
export const slotToTime = (slot: number): string => {
    const hours: number = Math.floor(slot * 5 / 60);
    const minutes: number =  (slot % 12) * 5;
    let resultTime = numberToString(hours) + ":" + numberToString(minutes);
    return resultTime;
}

