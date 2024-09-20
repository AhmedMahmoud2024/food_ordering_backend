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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../src/auth/domain/User"));
class FakeRepository {
    constructor() {
        this.users = [
            {
                email: 'ali@gmail.com',
                id: '1234',
                name: "ali",
                password: '$2b$10jk$l.kjhohgiu',
                type: "email"
            },
            {
                email: 'ali1@gmail.com',
                id: '1235',
                name: "ali",
                password: '$2b$10jk$l.kjhohgiu',
                type: "google"
            }
        ];
    }
    find(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find((x) => x.email === email);
            if (!user)
                return Promise.reject('User Not Found');
            return new User_1.default(user === null || user === void 0 ? void 0 : user.id, user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.email, user === null || user === void 0 ? void 0 : user.password, user === null || user === void 0 ? void 0 : user.type);
        });
    }
    add(name, email, password, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const max = 9999;
            const min = 1000;
            const id = (Math.random() * (+max - +min)).toString();
            this.users.push({
                id: id,
                name: name,
                type: type,
                email: email,
                password: password
            });
            return id;
        });
    }
}
exports.default = FakeRepository;
