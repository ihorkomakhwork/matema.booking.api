export const updateTimeSlots = async  (res: any, timeslots: Array<number[]>, trx: any, knex: any) => {
          for (let i = 0; i < res.length; i++) {
              const userData = res[i]; 
              const timeslot = timeslots[i]
              
               const resi: any = await knex('schedule')
                  .where({teacher_id: userData.teacher_id, date: userData.date})
                  .update({
                    time_slots: timeslot
                  }).transacting(trx)
                }
      };
export const trxCommit = async (trx: any): Promise<void> => {
    trx.commit();

}