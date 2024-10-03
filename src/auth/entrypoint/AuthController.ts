import ITokenService from "../services/ITokenService";
import SignInUseCase from "../usecases/SignInUseCase";
import SignupUseCase from "../usecases/SignupUseCase";
import SignupUsecase from "../usecases/SignupUseCase";
import * as express from 'express'
import SignOutUseCase from "../usecases/ٍSignoutUseCase";

export default class AuthController{
  private readonly signInUseCase:SignInUseCase
  private readonly signUpUseCase:SignupUseCase
  private readonly signOutUseCase: SignOutUseCase;
  private readonly tokenService:ITokenService

    constructor(
        signInUseCase:SignInUseCase,
        signUpUseCase:SignupUsecase,
        signOutUseCase: SignOutUseCase,
        tokenService:ITokenService
    ){
        this.signInUseCase = signInUseCase,
        this.signUpUseCase = signUpUseCase,
        this.signOutUseCase = signOutUseCase,
        this.tokenService = tokenService
    }

    public async signin(req:express.Request,res:express.Response){
     try{
        const {name,email,password,auth_type} = req.body
        return (await this.signInUseCase.execute(name,email,password,auth_type)
        .then((id:string)=>
            res.status(200).json({auth_token : this.tokenService.encode(id)})
        ).catch((err:Error)=>res.status(404).json({err:err.message})))
     }catch(err){
      return res.status(400).json({error:err})  
    
     }
    }

    public async signup(req:express.Request,res:express.Response){
        try{
           const {name,email,password,auth_type} = req.body
           return (await this.signUpUseCase.execute(name,auth_type,email,password)
           .then((id:string)=>
               res.status(200).json({auth_token : this.tokenService.encode(id)})
           ).catch((err:Error)=>res.status(404).json({err:err.message})))
        }catch(err){
         return res.status(400).json({error:err})  
       
        }
       }
    async signout(req: express.Request, res: express.Response): Promise<void> {
        const userId = (req as any).user?.id; // Type assertion to avoid TypeScript error
        const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token

        if (!userId || !token) {
            res.status(400).json({ message: 'User ID and token are required' });
            return;
        }

        const success = await this.signOutUseCase.execute(userId);

        if (success) {
            res.status(200).json({ message: 'Successfully signed out' });
        } else {
            res.status(400).json({ message: 'Sign out failed' });
        }
    }
}