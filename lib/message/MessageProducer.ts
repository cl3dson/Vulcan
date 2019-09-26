import {MessageBrokerAdapter} from "../brokerAdapter/MessageBrokerAdapter";
import {AbstractMessage} from "./AbstractMessage";
import {Serializable} from "./Serializable";
import {AbstractCommand} from "./Command";

export class MessageProducer {
    private brokerAdapter:MessageBrokerAdapter

    public async publishMessage(message:AbstractMessage<Serializable>):Promise<boolean>{
        if(message instanceof AbstractCommand){
            return this.brokerAdapter.sendDirectMessage(message)
        }
        return false;
    }
}