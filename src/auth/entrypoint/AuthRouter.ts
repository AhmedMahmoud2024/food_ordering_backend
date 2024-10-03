import * as express from 'express'
import IAuthRepository from '../domain/IAuthRepository';
import ITokenService from '../services/ITokenService';
import IPasswordService from '../services/IPasswordService';
import AuthController from './AuthController';
import SignInUseCase from '../usecases/SignInUseCase';
import SignupUseCase from '../usecases/SignupUseCase';
import { signupValidationRules, signinValidationRules, validate } from '../helpers/Validators';
import SignOutUseCase from '../usecases/ٍSignoutUseCase';
import ITokenStore from '../services/ITokenStore';

export default class AuthRoute {
    public static configure(
        authRepository: IAuthRepository,
        tokenService: ITokenService,
        passwordService: IPasswordService,
        tokenStore?:ITokenStore
    ): express.Router {
        const router = express.Router();
        let controller = AuthRoute.composeController(
            authRepository,
            tokenService,
            passwordService,
            tokenStore!
        );

        router.post(
            '/signin',
            signinValidationRules(),
            validate,
            (req: express.Request, res: express.Response) => controller.signin(req, res)
        );
        router.post(
            '/sigup',
            signupValidationRules(),
            validate,
            (req: express.Request, res: express.Response) =>
                controller.signin(req, res)
        );
        router.post(
            '/signout',
            (req: express.Request, res: express.Response) => controller.signout(req, res)
        );

        return router;
    }

    private static composeController(
        authRepository: IAuthRepository,
        tokenService: ITokenService,
        passwordService: IPasswordService,
        tokenStore:ITokenStore
    ): AuthController {
        const signinUseCase = new SignInUseCase(authRepository, passwordService);
        const signupUseCase = new SignupUseCase(authRepository, passwordService);
        const signoutUseCase = new SignOutUseCase(tokenStore);

        const controller = new AuthController(signinUseCase, signupUseCase, signoutUseCase, tokenService);
        return controller;
    }
}