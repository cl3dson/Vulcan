import {AbstractCommand} from "../message/Command";
import {Serializable} from "../message/Serializable";
import {AbstractService} from "../service/AbstractService";

export interface MessageBrokerAdapter {
    sendDirectMessage(message:AbstractCommand<AbstractService>):Promise<boolean>
}