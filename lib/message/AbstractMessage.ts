import {Serializable} from "./Serializable";
import {AbstractService} from "../service/AbstractService";

export abstract class AbstractMessage <T extends Serializable> {
    private descriptor: string
    private uuid: string;
    private content: T;
    private creationTimestamp: Date;
    private parentMessage: AbstractMessage<T>
    private originService: AbstractService

    public getDescriptor():string {
        return this.descriptor;
    }

    public getUuid():string{
        return this.uuid;
    }

    public getContent():T{
        return this.content;
    }

    public getCreationTimestamp():Date{
        return this.creationTimestamp;
    }

    public getParentMessage():AbstractMessage<T> {
        return  this.parentMessage;
    }

    public getOriginService(){
        return this.parentMessage;
    }

    public toString():string{
        return this.uuid
    }
}