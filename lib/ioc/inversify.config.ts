import {Container} from "inversify";
import {MessageBrokerAdapter} from "../brokerAdapter/MessageBrokerAdapter";
import * as TYPES from './types'
import {RabbitMQAdapter} from "../brokerAdapter/RabbitMQAdapter";

const container = new Container()
container.bind<MessageBrokerAdapter>(TYPES.MESSAGE_BROKER_ADAPTER).to(RabbitMQAdapter)

export {container}
