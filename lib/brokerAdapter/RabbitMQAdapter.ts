import { Channel, connect, Connection, ConsumeMessage } from 'amqplib';
import { AbstractCommand } from '../message/Command';
import { MessageBrokerAdapter } from './MessageBrokerAdapter';
import { AbstractService } from '../service/AbstractService';
import { injectable } from 'inversify';

@injectable()
export class RabbitMQAdapter implements MessageBrokerAdapter {
    private static MERCURY_EXCHANGE = 'mercury_main_exchange';

    private connection: Connection;
    private channel: Channel;
    private connectionParams: object;

    constructor(connectionParams) {
        this.connectionParams = connectionParams;
        this.connect(connectionParams).catch(e => {
            throw e;
        });
    }

    private async connect(connectionParams: object): Promise<Connection> {
        try {
            this.connection = await connect(connectionParams);
            this.channel = await this.connection.createChannel();
            return this.connection;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    public async sendDirectMessage(message: AbstractCommand<AbstractService>): Promise<boolean> {
        try {
            return this.channel.publish(
                this.commandExchangeNameForService(message),
                message.getDescriptor(),
                Buffer.from(message.getContent().serialize()),
                {
                    appId: 'MERCURY',
                    messageId: message.getUuid(),
                    persistent: true,
                    timestamp: new Date().getTime(),
                },
            );
        } catch (e) {
            throw e;
        }
    }

    private commandExchangeNameForService(command: AbstractCommand<AbstractService>): string {
        const serviceName = command.getDestinationService().getName();
        return `command_exchange_${serviceName}`;
    }

    private async setUp(): Promise<void> {
        /* Creating Exchanges and queues */
        try {
            await this.channel.assertExchange(this.main_bus, 'fanout', {
                autoDelete: false,
                durable: true,
            });
            await this.channel.assertExchange(this.exchange, 'direct', {
                autoDelete: false,
                durable: true,
            });
            await this.channel.assertExchange(this.deadLetterExchange, 'fanout', {
                autoDelete: false,
                durable: true,
            });
            await this.channel.assertQueue(this.queue, {
                autoDelete: false,
                deadLetterExchange: this.deadLetterExchange,
                durable: true,
            });
            await this.channel.assertQueue(this.retryQueue, {
                arguments: {
                    'x-message-ttl': this.delayRetry * DEFAULT_MS_STEP,
                },
                autoDelete: false,
                deadLetterExchange: this.exchange,
                durable: true,
            });

            /* Creating the basic bindings */
            await this.channel.bindExchange(this.exchange, this.main_bus, '');
            await this.channel.bindQueue(this.retryQueue, this.deadLetterExchange, '');
        } catch (e) {
            throw e;
        }
        return true;
    }
}
