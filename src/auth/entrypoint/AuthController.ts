import ITokenService from "../services/ITokenService";
import SignInUseCase from "../usecases/SignInUseCase";
import SignupUseCase from "../usecases/SignupUseCase";
import SignupUsecase from "../usecases/SignupUseCase";
import * as express from 'express'
export default class AuthController{
  private readonly signInUseCase:SignInUseCase
  private readonly signUpUseCase:SignupUseCase
  private readonly tokenService:ITokenService

    constructor(
        signInUseCase:SignInUseCase,
        signUpUseCase:SignupUsecase,
        tokenService:ITokenService
    ){
        this.signInUseCase = signInUseCase,
        this.signUpUseCase = signUpUseCase,
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
}