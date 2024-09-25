import * as express from 'express'
import IAuthRepository from '../domain/IAuthRepository';
import ITokenService from '../services/ITokenService';
import IPasswordService from '../services/IPasswordService';
import AuthController from './AuthController';
import SignInUseCase from '../usecases/SignInUseCase';
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
     router.post('/signin',(req,res)=>controller.signin(req,res))
     return router
    }
    private static composeController(
        authRepository:IAuthRepository,
        tokenService:ITokenService,
        passwordService:IPasswordService
    ): AuthController{
  const signinUseCase = new SignInUseCase(authRepository,passwordService)
  const controller = new AuthController(signinUseCase,tokenService)
  return controller
    }
}