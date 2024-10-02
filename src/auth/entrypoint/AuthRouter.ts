import * as express from 'express'
import IAuthRepository from '../domain/IAuthRepository';
import ITokenService from '../services/ITokenService';
import IPasswordService from '../services/IPasswordService';
import AuthController from './AuthController';
import SignInUseCase from '../usecases/SignInUseCase';
import SignupUseCase from '../usecases/SignupUseCase';
import { signupValidationRules,signinValidationRules, validate } from '../helpers/Validators';
export default class AuthRoute{
    public static configure(
        authRepository:IAuthRepository,
        tokenService:ITokenService,
        passwordService: IPasswordService
    ): express.Router{
     const router = express.Router()
     let controller = AuthRoute.composeController(
        authRepository,
        tokenService,
        passwordService
     )
     router.post(
        '/signin',
        signinValidationRules(),
        validate,
        (req:express.Request,res:express.Response)=>controller.signin(req,res))
     router.post(
        '/sigup',
        signupValidationRules(),
        validate,
        (req:express.Request,res:express.Response)=>
            controller.signin(req,res))
     
        return router
    }
    private static composeController(
        authRepository:IAuthRepository,
        tokenService:ITokenService,
        passwordService:IPasswordService
    ): AuthController{
  const signinUseCase = new SignInUseCase(authRepository,passwordService)
  
  const signupUseCase = new SignupUseCase(authRepository,passwordService)
  
  const controller = new AuthController(signinUseCase,signupUseCase,tokenService)
  return controller
    }
}