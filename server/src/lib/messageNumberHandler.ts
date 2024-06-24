
export default class Message {

    private static instance: Message;
    messageNumber: number;

    constructor() {
        this.messageNumber = 0;
    }

    public static getInstance(): Message {
        if (!Message.instance) {
            Message.instance = new Message();
        }
        return Message.instance;
    }

    public increment() {
        if (this.messageNumber < 100){
            this.messageNumber++;
            return this.getAsString(this.messageNumber);
        } else {
            this.messageNumber = 0;
            return this.getAsString(this.messageNumber);
        }
    }

    public getCurrentMessageNumber () {
        return this.getAsString(this.messageNumber);
    }

    public getAsString (messageNumber : number) {
        if (messageNumber < 10)
            return `00${messageNumber}`;
        return `0${messageNumber}`;
    }
}