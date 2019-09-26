import {AbstractMessage} from "./AbstractMessage";
import {Serializable} from "./Serializable";
import {AbstractService} from "../service/AbstractService";

export abstract class AbstractCommand<S extends AbstractService> extends AbstractMessage<Serializable>{
    private destinationService: S

    public getDestinationService(): S {
        return this.destinationService;
    }
 }