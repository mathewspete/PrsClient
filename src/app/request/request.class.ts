import { Requestline } from "../requestline/requestline.class";
import { User } from "../user/user.class";

export class Request {
    id: Number = 0;
    description: String;
    justification: String;
    rejectionReason: String = null;
    deliveryMode: String;
    status: String = "NEW";
    total:Number;
    userId: Number;
    user: User;
    userName: string;
    requestLine: Requestline;
}