import { Socket } from "socket.io";
import { ContestRoomEvent } from "./entities/contestRoom/contestRoom.dto";
import { PersonalRoomEvent } from "./entities/personalRoom/personalRoom.dto";
import { UserEvent } from "./entities/users/user.dto";
import ContestRoomController from "./operations/contestRoom/contestRoom.controller";
import PersonalRoomController from "./operations/personalRoom/personalRoom.controller";
import UserController from "./operations/user/user.controller";

export function registerEvents(socket: Socket) {    
    const contestRoomController = new ContestRoomController();
    const personalRoomController = new PersonalRoomController();
    const userController = new UserController();
    socket.on(ContestRoomEvent.SUB_TO_CONTEST, contestRoomController.subToContest.bind(contestRoomController, socket))
    socket.on(ContestRoomEvent.PRESENCE, contestRoomController.markPresence.bind(contestRoomController, socket))
    socket.on(ContestRoomEvent.SERVER_TIME, contestRoomController.getServerTime.bind(contestRoomController, socket))
    socket.on(ContestRoomEvent.CHECK_SUBSCRIPTION, contestRoomController.checkSubscription.bind(contestRoomController, socket)),
    socket.on(UserEvent.PING_PONG, userController.pingPong.bind(userController, socket))
    socket.on(UserEvent.DISCONNECT, userController.onDisconnect.bind(userController, socket, 'Joining Socket'))
    socket.on(UserEvent.DISCONNECTING, userController.onDisconnecting.bind(userController, socket, 'Joining Socket'))

    // Peronsal roo events
    socket.on(PersonalRoomEvent.CREATE_ROOM, personalRoomController.createRoom.bind(personalRoomController, socket))
    socket.on(PersonalRoomEvent.JOIN_ROOM, personalRoomController.joinRoom.bind(personalRoomController, socket))
    socket.on(PersonalRoomEvent.START_GAME, personalRoomController.startGame.bind(personalRoomController, socket))
    socket.on(PersonalRoomEvent.LEAVE_ROOM, personalRoomController.leaveRoom.bind(personalRoomController, socket))
    socket.on(PersonalRoomEvent.GET_ROOM, personalRoomController.getRoom.bind(personalRoomController, socket))
    socket.on(PersonalRoomEvent.PRIZE_BREAKUP, personalRoomController.getRoomPrizeBreakup.bind(personalRoomController, socket))

    // Offline Room
    socket.on(PersonalRoomEvent.START_OFFLINE_GAME, personalRoomController.startOfflineGame.bind(personalRoomController, socket))
};

export function registerCounterSocketEvents(socket: Socket){
    const contestRoomController = new ContestRoomController();
    const userController = new UserController();
    socket.on(ContestRoomEvent.CONTEST_COUTER, contestRoomController.getContestCounter.bind(contestRoomController, socket))
    socket.on(UserEvent.DISCONNECT, userController.onDisconnect.bind(userController, socket, 'Counter Socket'))
    socket.on(UserEvent.DISCONNECTING, userController.onDisconnecting.bind(userController, socket, 'Counter Socket'))
}