"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_meet = exports.createMeet = void 0;
const axios_1 = __importDefault(require("axios"));
const ZoomApiHelper_1 = __importDefault(require("../helpers/ZoomApiHelper"));
const createMeet = async (req, res, next) => {
    try {
        let au = new ZoomApiHelper_1.default();
        const token = au.getToken();
        const { email, start_time } = req.body;
        let response = await axios_1.default({
            method: 'POST',
            url: "https://api.zoom.us/v2/users/" + email + "/meetings",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {
                "topic": 1,
                "type": 2,
                "start_time": start_time
            }
        });
        if (response.status == 201) {
            return res.status(200).json({
                "Join URL:": response.data['join_url'],
                "uuid": response.data['uuid']
            });
        }
        return res.status(400).json({});
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error.response);
    }
};
exports.createMeet = createMeet;
const get_meet = async (req, res, next) => {
    try {
        let au = new ZoomApiHelper_1.default();
        const token = au.getToken();
        const { uuid } = req.body;
        let response = await axios_1.default({
            method: 'GET',
            url: "https://api.zoom.us/v2/meetings/" + uuid,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (response.status == 200) {
            return res.status(200).json({
                "status": response.data['status'],
                "start time": response.data['start_time'],
                "duration": response.data['duration']
            });
        }
        return res.status(400).json({});
    }
    catch (error) {
        return res.status(400).json(error.response.data);
    }
};
exports.get_meet = get_meet;
//# sourceMappingURL=ZoomApi.controller.js.map