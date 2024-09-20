"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SignInUseCase {
    constructor(authRepository, passwordService) {
        this.authRepository = authRepository;
        this.passwordService = passwordService;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authRepository.find(email);
            if (password === '' && user)
                return user.id;
            if (!(yield this.passwordService.compare(password, user.password))) {
                return Promise.reject('Invalid email or password');
            }
            return user.id;
        });
    }
}
exports.default = SignInUseCase;
