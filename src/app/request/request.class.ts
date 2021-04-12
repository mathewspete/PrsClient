import { Requestline } from "../requestline/requestline.class";
import { User } from "../user/user.class";

export class Request {
    id: number = 0;
    description: string;
    justification: string;
    rejectionReason: string = null;
    deliveryMode: string;
    status: string = "NEW";
    total: number;
    userId: number;
    user: User;
    userName: string;
    requestLine: Requestline;
}