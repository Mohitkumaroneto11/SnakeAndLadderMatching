import {Express} from 'express-serve-static-core';
import express, { NextFunction, Response } from 'express'
import { AuthenticationService } from 'middleware/auth';
import ContestRoomController from './operations/contestRoom/contestRoom.controller';
import multer from 'multer';
import { Request } from 'mssql';
import upload from 'middleware/upload';
import PersonalRoomController from './operations/personalRoom/personalRoom.controller';

export function routes(app: Express) {    
    const contestController = new ContestRoomController();
    const roomController = new PersonalRoomController();
    const authRouter = express.Router();
    const nonAuthRouter = express.Router();
    //const jsonParser = new BodyParser();

    authRouter.use('/',AuthenticationService.authenticateApiRequest)
    authRouter.get('/contest/getContest', contestController.getContestList.bind(contestController));
    authRouter.get('/v2/contest/getContest', contestController.getContestListV2.bind(contestController));
    authRouter.get('/free/contest/getContest', contestController.getFreeContestList.bind(contestController));
    authRouter.get('/contest/getContestById', contestController.getContestById.bind(contestController));
    authRouter.get('/contest/getUserJoinContest', contestController.getUserJoinContest.bind(contestController));
    authRouter.post('/upload',upload.array('logs',1), contestController.upload.bind(contestController));

    nonAuthRouter.get('/contest/getContestPrizeBreakUp', contestController.getContestPrizeBreakUp.bind(contestController));
    // nonAuthRouter.post('/upload', contestController.upload.bind(contestController));

    // Offline room API
    authRouter.post('/offlineRoom/declareResult', roomController.declareResult.bind(roomController));
    authRouter.post('/offlineRoom/saveLog', roomController.saveRoomLog.bind(roomController));
    authRouter.post('/offlineRoom/cancel', roomController.cancelOfflineRoom.bind(roomController));

    app.use('/api',authRouter).use('/server',nonAuthRouter).get('/', (request, response) => {
        response.send(`MatchMaking server in running (${new Date()})`);
    });
    
    app.use('/api',authRouter).use('/server',nonAuthRouter);
    
};
