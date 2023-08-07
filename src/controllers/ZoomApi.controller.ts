import { NextFunction, Request, Response } from 'express';
import axios from 'axios'; 
import AuthToken from '../helpers/ZoomApiHelper'


export const createMeet = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    try { 

        let au = new AuthToken()
        const token = au.getToken() 

        const { email, start_time } = req.body;
        
        let response = await axios({
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
        })
        if (response.status == 201) {
            return res.status(200).json({
                "Join URL:": response.data['join_url'],
                "uuid": response.data['uuid']
            });
        }
        return res.status(400).json({});
    } catch (error) {
        console.log(error);
        
        return res.status(400).json(error.response);
    }
}

export const get_meet = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> => {
    try { 
        let au = new AuthToken()
        const token = au.getToken()

        const { uuid } = req.body; 
         
        let response = await axios({
            method: 'GET',
            url: "https://api.zoom.us/v2/meetings/" + uuid,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })  
        
        if (response.status == 200) { 
            
            return res.status(200).json({
                "status": response.data['status'],
                "start time": response.data['start_time'], 
                "duration": response.data['duration'] 
            });
        }
        return res.status(400).json({});
    } catch (error) {
        return res.status(400).json(error.response.data);
    }
}