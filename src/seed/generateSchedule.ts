// import { getAllTeachers } from "../controllers/Teacher.controller";
// import knex from "../db";
// import ITeacher from "../interfaces/Teacher.interface";
//
// const NUMBER_OF_TIME_SLOTS = 288;
// const NUMBER_OF_DAYS = 7;
// let currentDay = new Date();
//
// (async () => {
//     let teachers = await getAllTeachers();
//     for (let currentTeacher of teachers) {
//         console.log("Add schedule for teacher " + currentTeacher.id);
//         await generateDay(currentTeacher);
//       }
// })();
//
// async function generateDay(currentTeacher: ITeacher): Promise<void> {
//   for (let i = 0; i < NUMBER_OF_DAYS; i++) {
//     addDays(currentDay, i);
//
//     const schedule = {
//       teacher_id: currentTeacher.id,
//       date: currentDay.toLocaleDateString("en-CA"),
//       time_slots: generateTimeSlots(),
//     };
//
//     try {
//       const schedule_id = await knex("schedule").insert(schedule).returning('id').then(function(_result: any){
//         console.log("Save a new schedule with id: " + _result);
//       });
//     } catch (e: any) {
//       console.log(e);
//     }
//   }
// }
//
// function generateTimeSlots(): Array<number> {
//   let time_slots = [];
//   for (let j = 0; j <= NUMBER_OF_TIME_SLOTS; j++) {
//     if (randomTrue()) {
//       time_slots.push(j);
//     }
//   }
//   return time_slots;
// }
//
// function addDays(date: Date, days: number): Date {
//   date.setDate(date.getDate() + days);
//   return date;
// }
//
// function randomTrue(): Boolean {
//   return Math.floor(Math.random() * 5) < 4;
// }
