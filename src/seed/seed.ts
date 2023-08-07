import knex from '../db/knex';
import { Role } from '../enums/ClientEnums';
import { Profile, Status } from '../enums/TeacherEnums';
import { Task, Class } from '../enums/StudentEnums';

async function insertSampleData() {
    console.log('Add client');
    const client = {
        first_name: 'Василь',
        patronymic: 'Богданович',
        last_name: 'Петренко',
        phones: ['+38022222223'],
        emails: ['test3@gmail.com'],
        role: Role.guardian
    };
    try{
        await knex('clients').returning('id').insert(client).then(
            function (result: any) {
                console.log('Save a new client with id: ' + result);
            });
    } catch (error) {
        console.log(error);
    };
    


    console.log('Add client 2');
    const client_ = {
        first_name: 'Євгеній',
        patronymic: 'Андрійович',
        last_name: 'Конопленко',
        phones: ['+380228220482'],
        emails: ['test3@gmail.com'],
        role: 'father'
    };
    try{
        await knex('clients').returning('id').insert(client_).then(
            function (result: any) {
                console.log('Save a new client with id: ' + result);
            });
    } catch (error) {
        console.log(error);
    };

    console.log('Add teacher');
    const teacher = {
        first_name: 'Ярослав',
        patronymic: 'Владиславович',
        last_name: 'Крамар',
        phone: ['+380675242973'],
        emails: ['example_teacher1@gmail.com'],
        class: '5-11',
        status: 'Working',
        profile: 'ZNO'
    };
    try{
        await knex('teachers').returning('id').insert(teacher).then(
            function (result: any) {
                console.log('Save a new teacherwith id: ' + result);
            });
    } catch (error) {
        console.log(error);
    };

    console.log('Add teacher 2');
    const teacher_ = {
        first_name: 'Микола',
        patronymic: 'Русланович',
        last_name: 'Василенко',
        phone: ['+380975236478'],
        emails: ['example_teacher@gmail.com'],
        class: '5-9',
        status: 'Working',
        profile: 'DPA'
    };
    try{
        await knex('teachers').returning('id').insert(teacher_).then(
            function (result: any) {
                console.log('Save a new teacher with id: ' + result);
            });
    } catch (error) {
        console.log(error);
    };

    console.log('Add student 1');
    const student = {
        first_name: 'Ivan',
        last_name: 'Ivanov',
        patronymic: 'Petrovich',
        phones: ['+380681111111'],
        task: 'DPA',
        goal: 'test',
        class: '9th grade',
        emails: ['test@gmail.com'],
        client_id: '1'
    };
    try{
        await knex('students').returning('id').insert(student).then(
            function (result: any) {
                console.log('Save a new student with id: ' + result);
            });
    } catch (error) {
        console.log(error);
    };


    console.log('Add student 2');
    const student_ = {
        first_name: 'Dmitro',
        last_name: 'Sidorchuk',
        patronymic: 'Ivanovich',
        phones: ['+380682211111'],
        task: 'School program',
        goal: 'test',
        class: '10th grade',
        emails: ['test3@gmail.com'],
        client_id: '2'
    };
    try{
        await knex('students').returning('id').insert(student_).then(
            function (result: any) {
                console.log('Save a new student with id: ' + result);
            });
    } catch (error) {
        console.log(error);
    };
};

insertSampleData();
