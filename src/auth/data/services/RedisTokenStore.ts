import { Redis } from 'ioredis'; // Add this import if not already present

const client = createClient();
import { promisify } from "util";
import ITokenStore from "../../services/ITokenStore";

export default class RedisTokenStore implements ITokenStore{
    
    constructor(private client: Redis) {} // Ensure the client is properly typed
    
    async save(token: string): Promise<void> {
        await this.client.set(token, token);
    }
    async get(token: string): Promise<string> {
        const getAsync = promisify(this.client.get).bind(this.client)
        const res = await getAsync(token)
        return res ?? ''
    }

}

function createClient() {
    throw new Error('Function not implemented.');
}
