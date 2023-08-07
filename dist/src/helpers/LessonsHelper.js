"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trxCommit = exports.updateTimeSlots = void 0;
const updateTimeSlots = async (res, timeslots, trx, knex) => {
    for (let i = 0; i < res.length; i++) {
        const userData = res[i];
        const timeslot = timeslots[i];
        const resi = await knex('schedule')
            .where({ teacher_id: userData.teacher_id, date: userData.date })
            .update({
            time_slots: timeslot
        }).transacting(trx);
    }
};
exports.updateTimeSlots = updateTimeSlots;
const trxCommit = async (trx) => {
    trx.commit();
};
exports.trxCommit = trxCommit;
//# sourceMappingURL=LessonsHelper.js.map