import mongoose from "mongoose";
import AuthRepository from "./auth/data/repository/AuthRepository";
import JwtTokenService from "./auth/data/services/JwtTokenService";
import BecryptPasswordService from "./auth/data/services/BecryptPasswordService";
import AuthRoute from "./auth/entrypoint/AuthRouter";
import RedisTokenStore from "./auth/data/services/RedisTokenStore";

export default class CompositionRoot{
private static client:mongoose.Mongoose

public static configure(){
    this.client = new mongoose.Mongoose()
    const connectionStr = encodeURI(process.env.TEST_DB as string)
    this.client.connect(connectionStr) 
}

public static authRouter(){
    const repository = new AuthRepository(this.client)
    const tokenService = new JwtTokenService(process.env.PRIVATE_KEY as string)
    const passwordService =new BecryptPasswordService()
    
    return AuthRoute.configure(repository, tokenService, passwordService)
}
}