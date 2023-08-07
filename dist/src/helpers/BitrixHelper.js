"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDB = exports.updateDeal = exports.addDeal = exports.updateContact = exports.addContact = void 0;
const axios_1 = __importDefault(require("axios"));
const knex_1 = __importDefault(require("../db/knex"));
const CRMContactType_1 = require("../enums/CRMContactType");
require('dotenv').config();
const bitrixApiLink = process.env.BITRIX_API_LINK ||
    'https://matematest2.bitrix24.ua/rest/4/tcpn5yrgd06cpe24/';
const columnSkip = ['ID', 'NAME', 'LAST_NAME', 'SECOND_NAME', 'PHONE', 'EMAIL', 'Ім\'я учня', 'Клас учня', 'Ціль навчання', 'Телефон учня', 'CONTACT_ID'];
const defaultContactColumn = ['NAME', 'LAST_NAME', 'SECOND_NAME']; // repeated fields
const defaultDealColumn = ['Ім\'я учня', 'Клас учня', 'Ціль навчання', 'Телефон учня', 'CONTACT_ID']; // repeated fields
const enumFields = ['EMAIL', 'WEB', 'PHONE', 'IM'];
const currentDataById = async (link, bitrixId, fieldsName, bitrixType) => {
    let bitrixLink = link + `crm.${bitrixType}.list.json?FILTER[ID]=${bitrixId}`;
    for (const key in fieldsName) {
        if (Object.prototype.hasOwnProperty.call(fieldsName, key)) {
            bitrixLink += `&SELECT[]=${key}`;
        }
    }
    return await (await axios_1.default.get(bitrixLink)).data.result[0];
};
const currentData = async (link, fieldsName, bitrixType) => {
    let bitrixLink = link + `crm.${bitrixType}.list.json?SELECT[]=`;
    for (const key in fieldsName) {
        if (Object.prototype.hasOwnProperty.call(fieldsName, key)) {
            bitrixLink += `&SELECT[]=${key}`;
        }
    }
    return await (await axios_1.default.get(bitrixLink)).data.result;
};
const currentFieldsName = async (link, bitrixType) => {
    const bitrixLink = link + `crm.${bitrixType}.fields.json`;
    return await (await axios_1.default.get(bitrixLink)).data.result;
};
const isDynamic = (fieldName, fieldsName) => {
    return fieldsName[fieldName].isDynamic ? true : false;
};
// This method convert object format {UF_CRM_*: data, ...} to example {Ім'я учня: data, ...}
// data - object format {UF_CRM_*: data, ...}, fieldsName - object format "UF_CRM_1628527876975": {"isDynamic": true, "listLabel": "Ім'я учня"}
const convertDataToObjectForDBWrite = (data, fieldsName, propertySkip) => {
    let DTO = {};
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key) &&
            data[key] !== null &&
            !propertySkip.includes(key) && !propertySkip.includes(fieldsName[key].listLabel)) {
            if (isDynamic(key, fieldsName)) {
                const name = fieldsName[key].listLabel;
                if (fieldsName[key].type === 'enumeration') {
                    DTO[name] = dataFromBitrixEnum(fieldsName, key, data[key]);
                }
                else {
                    DTO[name] = data[key];
                }
            }
            else if (Array.isArray(data[key])) {
                DTO[key] = takeValuesFromObject(data[key]);
            }
            else if (fieldsName[key].type === 'enumeration') {
                DTO[key] = dataFromBitrixEnum(fieldsName, key, data[key]);
            }
            else {
                DTO[key] = data[key];
            }
        }
    }
    return DTO;
};
const takeValuesFromObject = (object) => {
    let data = [];
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = object[key];
            data.push(element.VALUE);
        }
    }
    return data;
};
const generateListWithNewColumn = async (dataFromBitrix, fieldsName, nameOfTable) => {
    const columns = new Set();
    for (const key in dataFromBitrix) {
        if (Object.prototype.hasOwnProperty.call(dataFromBitrix, key)) {
            if (dataFromBitrix[key] !== null &&
                fieldsName[key].listLabel !== undefined &&
                !columnSkip.includes(key) &&
                !columnSkip.includes(fieldsName[key].listLabel) &&
                isDynamic(key, fieldsName) &&
                !(await knex_1.default.schema.hasColumn(nameOfTable, fieldsName[key].listLabel))) {
                columns.add(fieldsName[key].listLabel);
            }
            else if (dataFromBitrix[key] !== null &&
                !columnSkip.includes(key) &&
                !isDynamic(key, fieldsName) &&
                !columnSkip.includes(fieldsName[key].listLabel) &&
                !(await knex_1.default.schema.hasColumn(nameOfTable, key))) {
                columns.add(key);
            }
        }
    }
    return columns;
};
const insertCustomFieldsToDB = async (dataFromBitrix, fieldsName, nameOfTable, bitrixFieldsId) => {
    const columns = await generateListWithNewColumn(dataFromBitrix, fieldsName, nameOfTable);
    // generate new column on table       
    await knex_1.default.schema.table(nameOfTable, (table) => {
        columns.forEach(async (element) => {
            table.string(element);
        });
    });
    // update custom fields on DB, if the fields are repeated, only the last field will be written to the database
    const dataToDB = convertDataToObjectForDBWrite(dataFromBitrix, fieldsName, columnSkip);
    // Under code not optimize
    if (Object.keys(dataToDB).length !== 0) {
        await knex_1.default(nameOfTable)
            .whereRaw('id = ?', bitrixFieldsId)
            .update(dataToDB);
    }
};
const dataFromBitrixEnum = (fieldsName, bitrixKey, bitrixEnumID) => {
    for (const key in fieldsName) {
        if (Object.prototype.hasOwnProperty.call(fieldsName, key) && key === bitrixKey) {
            return fieldsName[key].items.find((element) => {
                return element.ID === bitrixEnumID;
            }).VALUE;
        }
    }
};
const convertDealToDefaultStudentFields = (dataFromBitrix, fieldsName) => {
    let result = {};
    for (const key in dataFromBitrix) {
        if (Object.prototype.hasOwnProperty.call(dataFromBitrix, key)) {
            if (fieldsName[key].listLabel === 'Ім\'я учня') {
                result['name'] = dataFromBitrix[key];
            }
            else if (fieldsName[key].listLabel === 'Телефон учня') {
                result['phone'] = [dataFromBitrix[key]];
            }
            else if (fieldsName[key].listLabel === 'Ціль навчання') {
                result['goal'] = dataFromBitrixEnum(fieldsName, key, dataFromBitrix[key]);
            }
            else if (fieldsName[key].listLabel === 'Клас учня') {
                result['class'] = dataFromBitrixEnum(fieldsName, key, dataFromBitrix[key]);
            }
        }
    }
    return result;
};
const insertToDB = async (dataFromBitrix, fieldsName, bitrixFieldsId, nameOfTable) => {
    if (nameOfTable === 'students') {
        await knex_1.default(nameOfTable).insert({
            id: bitrixFieldsId,
            client_id: dataFromBitrix.CONTACT_ID,
            ...convertDealToDefaultStudentFields(dataFromBitrix, fieldsName)
        });
    }
    else if (['clients', 'teachers'].includes(nameOfTable)) {
        let email = takeValuesFromObject(dataFromBitrix.EMAIL);
        let phone = takeValuesFromObject(dataFromBitrix.PHONE);
        await knex_1.default(nameOfTable).insert({
            name: dataFromBitrix.NAME,
            last_name: dataFromBitrix.LAST_NAME,
            second_name: dataFromBitrix.SECOND_NAME,
            phone,
            email,
            id: bitrixFieldsId
        });
    }
    await insertCustomFieldsToDB(dataFromBitrix, fieldsName, nameOfTable, bitrixFieldsId);
};
const updateToDB = async (dataFromDB, dataFromBitrix, nameOfTable, bitrixFieldsId, fieldsName) => {
    let updateData = {};
    for (const key in dataFromBitrix) {
        if (Object.prototype.hasOwnProperty.call(dataFromBitrix, key)) {
            if ('ID' === key || dataFromBitrix[key] === null) {
                continue;
            }
            if (defaultDealColumn.includes(fieldsName[key].listLabel)) {
                // 'Ім\'я учня', 'Клас учня', 'Ціль навчання', 'Телефон учня'
                if (fieldsName[key].listLabel === 'Ім\'я учня' && dataFromBitrix[key] !== dataFromDB['name']) {
                    updateData['name'] = dataFromBitrix[key];
                }
                else if (fieldsName[key].listLabel === 'Телефон учня' && dataFromBitrix[key] !== dataFromDB['phone'].toString()) {
                    updateData['phone'] = [dataFromBitrix[key]];
                }
                else if (fieldsName[key].listLabel === 'Ціль навчання' && dataFromBitrixEnum(fieldsName, key, dataFromBitrix[key]) !== dataFromDB['goal']) {
                    updateData['goal'] = dataFromBitrixEnum(fieldsName, key, dataFromBitrix[key]);
                }
                else if (fieldsName[key].listLabel === 'Клас учня' && dataFromBitrixEnum(fieldsName, key, dataFromBitrix[key]) !== dataFromDB['class']) {
                    updateData['class'] = dataFromBitrixEnum(fieldsName, key, dataFromBitrix[key]);
                }
                continue;
            }
            // Logic for custom fields
            if (key === fieldsName[key].title && isDynamic(key, fieldsName)) {
                if (!(await knex_1.default.schema.hasColumn(nameOfTable, fieldsName[key].listLabel))) {
                    await knex_1.default.schema.table(nameOfTable, (table) => {
                        table.string(fieldsName[key].listLabel);
                    });
                }
                if (dataFromBitrix[key] !== dataFromDB[fieldsName[key].listLabel] && fieldsName[key].type !== 'enumeration') {
                    updateData[fieldsName[key].listLabel] = dataFromBitrix[key];
                }
                else if (fieldsName[key].type === 'enumeration') {
                    const currentData = dataFromBitrixEnum(fieldsName, key, dataFromBitrix[key]);
                    if (currentData !== dataFromDB[fieldsName[key].listLabel]) {
                        updateData[fieldsName[key].listLabel] = currentData;
                    }
                }
                continue;
            }
            // Generate new default column
            if (!(await knex_1.default.schema.hasColumn(nameOfTable, key)) && !columnSkip.includes(key)) {
                await knex_1.default.schema.table(nameOfTable, (table) => {
                    table.string(key);
                });
            }
            if (enumFields.includes(key)) {
                const data = takeValuesFromObject(dataFromBitrix[key]);
                if (key === 'PHONE' && data.toString() !== dataFromDB['phone'].toString()) {
                    updateData['phone'] = data;
                }
                else if (key === 'EMAIL' && data.toString() !== dataFromDB['email'].toString()) {
                    updateData['email'] = data;
                }
                else if (!['PHONE', 'EMAIL'].includes(key)) {
                    const dataDB = dataFromDB[key].slice(1, -1).split(',').map((element) => element.slice(1, -1));
                    if (data.toString() !== dataDB.toString()) {
                        updateData[key] = data;
                    }
                }
            }
            else if (fieldsName[key].type === 'enumeration') {
                const currentData = dataFromBitrixEnum(fieldsName, key, dataFromBitrix[key]);
                if (currentData !== dataFromDB[key]) {
                    updateData[key] = currentData;
                }
            }
            else if (key === 'CONTACT_ID' && nameOfTable === 'students' && parseInt(dataFromBitrix[key], 10) !== dataFromDB['client_id']) {
                updateData['client_id'] = dataFromBitrix[key];
            }
            else if (defaultContactColumn.includes(key) && dataFromBitrix[key] !== dataFromDB[key.toLowerCase()]) {
                updateData[key.toLowerCase()] = dataFromBitrix[key];
            }
            else if (dataFromBitrix[key] !== dataFromDB[key] && !defaultContactColumn.includes(key) && !defaultDealColumn.includes(key)) {
                updateData[key] = dataFromBitrix[key];
            }
        }
    }
    if (Object.keys(updateData).length !== 0) {
        await knex_1.default(nameOfTable)
            .whereRaw('id = ?', bitrixFieldsId)
            .update(updateData);
    }
};
const getCurrentRole = async (bitrixFieldsId) => {
    const dataClints = await knex_1.default('clients').where('id', bitrixFieldsId);
    const dataTeachers = await knex_1.default('teachers').where('id', bitrixFieldsId);
    if (Object.keys(dataClints).length !== 0) {
        return [CRMContactType_1.CRMContactType.parents, dataClints];
    }
    else if (Object.keys(dataTeachers).length !== 0) {
        return [CRMContactType_1.CRMContactType.teacher, dataTeachers];
    }
    else
        return ["", ""];
};
const addContact = async (bitrixFieldsId) => {
    const fieldsName = await currentFieldsName(bitrixApiLink, 'contact');
    const dataFromBitrix = await currentDataById(bitrixApiLink, bitrixFieldsId, fieldsName, 'contact');
    const role = dataFromBitrix.TYPE_ID; // - contact type from bitrix
    switch (role) {
        case CRMContactType_1.CRMContactType.parents:
            await insertToDB(dataFromBitrix, fieldsName, bitrixFieldsId, "clients");
            break;
        case CRMContactType_1.CRMContactType.teacher:
            await insertToDB(dataFromBitrix, fieldsName, bitrixFieldsId, "teachers");
            break;
        default:
            break;
    }
};
exports.addContact = addContact;
const updateContact = async (bitrixFieldsId) => {
    const fieldsName = await currentFieldsName(bitrixApiLink, 'contact');
    const dataFromBitrix = await currentDataById(bitrixApiLink, bitrixFieldsId, fieldsName, 'contact');
    const [currentRole, dataFromDB] = await getCurrentRole(bitrixFieldsId);
    const roleFromBitrix = dataFromBitrix.TYPE_ID; // - contact type from bitrix
    if (roleFromBitrix !== currentRole) {
        if (roleFromBitrix === CRMContactType_1.CRMContactType.parents) {
            await knex_1.default('teachers').whereRaw('id = ?', bitrixFieldsId).del();
            await insertToDB(dataFromBitrix, fieldsName, bitrixFieldsId, "clients");
        }
        else if (roleFromBitrix === CRMContactType_1.CRMContactType.teacher) {
            await knex_1.default('students').whereRaw('client_id = ?', bitrixFieldsId).update({ client_id: null });
            await knex_1.default('clients').whereRaw('id = ?', bitrixFieldsId).del();
            await insertToDB(dataFromBitrix, fieldsName, bitrixFieldsId, "teachers");
        }
        else if (roleFromBitrix === "") {
            await knex_1.default('students').whereRaw('client_id = ?', bitrixFieldsId).update({ client_id: null });
            await knex_1.default('clients').whereRaw('id = ?', bitrixFieldsId).del();
            await knex_1.default('teachers').whereRaw('id = ?', bitrixFieldsId).del();
        }
    }
    else {
        switch (roleFromBitrix) {
            case CRMContactType_1.CRMContactType.parents:
                await updateToDB(dataFromDB[0], dataFromBitrix, 'clients', bitrixFieldsId, fieldsName);
                break;
            case CRMContactType_1.CRMContactType.teacher:
                await updateToDB(dataFromDB[0], dataFromBitrix, 'teachers', bitrixFieldsId, fieldsName);
                break;
            default:
                break;
        }
    }
};
exports.updateContact = updateContact;
const addDeal = async (bitrixFieldsId) => {
    const fieldsName = await currentFieldsName(bitrixApiLink, 'deal');
    const dataFromBitrix = await currentDataById(bitrixApiLink, bitrixFieldsId, fieldsName, 'deal');
    await insertToDB(dataFromBitrix, fieldsName, bitrixFieldsId, "students");
};
exports.addDeal = addDeal;
const updateDeal = async (bitrixFieldsId) => {
    const fieldsName = await currentFieldsName(bitrixApiLink, 'deal');
    const dataFromBitrix = await currentDataById(bitrixApiLink, bitrixFieldsId, fieldsName, 'deal');
    const dataFromDB = await knex_1.default('students').where('id', bitrixFieldsId);
    await updateToDB(dataFromDB[0], dataFromBitrix, 'students', bitrixFieldsId, fieldsName);
};
exports.updateDeal = updateDeal;
const seedDB = async () => {
    const fieldsNameDeal = await currentFieldsName(bitrixApiLink, 'deal');
    const fieldsNameContact = await currentFieldsName(bitrixApiLink, 'contact');
    const dealFromBitrix = await currentData(bitrixApiLink, fieldsNameDeal, 'deal');
    const contactFromBitrix = await currentData(bitrixApiLink, fieldsNameContact, 'contact');
    const teachersId = (await knex_1.default.select('id').from('teachers')).map(((value) => value.id));
    const clientsId = (await knex_1.default.select('id').from('clients')).map(((value) => value.id));
    const studentsId = (await knex_1.default.select('id').from('students')).map(((value) => value.id));
    for (const key in contactFromBitrix) {
        if (Object.prototype.hasOwnProperty.call(contactFromBitrix, key)) {
            if (teachersId.includes(parseInt(contactFromBitrix[key].ID)) || clientsId.includes(parseInt(contactFromBitrix[key].ID))) {
                continue;
            }
            const element = contactFromBitrix[key];
            switch (element.TYPE_ID) {
                case CRMContactType_1.CRMContactType.parents:
                    await insertToDB(element, fieldsNameContact, element.ID, 'clients');
                    break;
                case CRMContactType_1.CRMContactType.teacher:
                    await insertToDB(element, fieldsNameContact, element.ID, 'teachers');
                    break;
                default:
                    break;
            }
        }
    }
    for (const key in dealFromBitrix) {
        if (Object.prototype.hasOwnProperty.call(dealFromBitrix, key) && !studentsId.includes(parseInt(dealFromBitrix[key].ID))) {
            const element = dealFromBitrix[key];
            await insertToDB(element, fieldsNameDeal, element.ID, 'students');
        }
    }
};
exports.seedDB = seedDB;
//# sourceMappingURL=BitrixHelper.js.map