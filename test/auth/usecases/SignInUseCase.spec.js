"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = __importStar(require("chai"));
const SignInUseCase_1 = __importDefault(require("../../../src/auth/usecases/SignInUseCase"));
const FakeRepository_1 = __importDefault(require("../helpers/FakeRepository"));
const FakePasswordService_1 = __importDefault(require("../helpers/FakePasswordService"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
chai_1.default.use(chai_as_promised_1.default);
describe('SignInUseCase', () => {
    let sut;
    let repository;
    let passwordService;
    const user = {
        email: 'ali@gmail.com',
        id: '1234',
        name: "ali",
        password: '$2b$10jk$l.kjhohgiu',
        type: "email"
    };
    beforeEach(() => {
        repository = new FakeRepository_1.default;
        passwordService = new FakePasswordService_1.default;
        sut = new SignInUseCase_1.default(repository, passwordService);
    });
    it('should throw error where user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { email: 'wrong@email.com', password: '12345' };
        //assert
        yield (0, chai_1.expect)(sut.execute(user.email, user.password)).to.be.rejectedWith('User Not Found');
    }));
});
function beforeEach(arg0) {
    throw new Error('Function not implemented.');
}
