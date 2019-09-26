import {AbstractCommand} from "../message/Command";
import {Serializable} from "../message/Serializable";

export abstract class AbstractService {
    private readonly name:string;
    private commands: AbstractCommand<AbstractService>[] = []

    protected constructor(name:string, commands:AbstractCommand<AbstractService>[]) {
        this.name = name;
        this.commands = this.commands.concat(commands)
    }

    public getName():string{
        return this.name;
    }


}