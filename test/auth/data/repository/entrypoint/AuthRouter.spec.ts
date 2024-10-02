//import AuthRepository from "../../../src/auth/data/repository/AuthRepository"
import express from 'express'
//import FakeRepository from "../helpers/FakeRepository"
//import IAuthRepository from "../../../src/auth/domain/IAuthRepository"
//import JwtTokenService from "../../../src/auth/data/services/JwtTokenService"
//import BecryptPasswordService from "../../../src/auth/data/services/BecryptPasswordService"
//import AuthRoute from "../../../src/auth/entrypoint/AuthRouter"
import request from 'supertest'
import chai ,{expect} from 'chai'
import IAuthRepository from '../../../../../src/auth/domain/IAuthRepository'
import FakeRepository from '../../../helpers/FakeRepository'
import JwtTokenService from '../../../../../src/auth/data/services/JwtTokenService'
import BecryptPasswordService from '../../../../../src/auth/data/services/BecryptPasswordService'
import AuthRoute from '../../../../../src/auth/entrypoint/AuthRouter'

describe('AuthRouter',()=>{
    let repository:IAuthRepository
    let app:express.Application

    const user = {
        email : 'baller@gg.com',
        id : '1234',
        name: 'ken',
        password: 'pass',
        type : 'email'
    }

    beforeEach(()=>{
        repository = new FakeRepository
        let tokenService = new JwtTokenService('privatekey')
        let passwordService = new BecryptPasswordService()

        app = express()
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))
        app.use(
            '/auth',
             AuthRoute.configure(repository,tokenService,passwordService)
        )
    })
    
    it('should return 404 when user is not found',async ()=>{
    await request(app).post('/auth/signin').send({}).expect(404)
    })

    it('should return 200 and token when user is found',async ()=>{
        await request(app)
        .post('/auth/signin')
        .send({email:user.email,password:user.password})
        .set('Accept','application/json')
        .expect('Content-type',/json/)
        .expect(200)
        .then((res)=>{
        expect(res.body.auth_token).to.not.be.empty
        })
        })

        it('should create user and return token',async ()=>{
            let email = 'my@email.com'
            let name = 'test user'
            let password = 'pass123'
            let type = 'email'
            await request(app)
            .post('/auth/signup')
            .send({email:email,password:password,auth_type:type,name:name})
            .set('Accept','application/json')
            .expect('Content-type',/json/)
            .expect(200)
            .then((res)=>{
            expect(res.body.auth_token).to.not.be.empty
            })
            })
})