import {default as io} from "socket.io-client";
import {URL} from "../constants.ts";

export const socket = io(URL, {
    transports: ['websocket'],
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5
})