interface BrokerConfig {
    hostname:string,
    password:string,
    port: number,
    protocol: string,
    username: string
}

export class Vulcan {

    private serviceName:string;
    private brokerConfig:BrokerConfig;

    constructor(serviceName:string){
        this.serviceName = serviceName
    }



    public async init()
}