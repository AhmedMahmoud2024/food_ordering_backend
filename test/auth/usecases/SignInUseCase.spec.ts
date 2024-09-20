
import 'mocha'
import chai ,{expect} from 'chai'
import SignInUseCase from '../../../src/auth/usecases/SignInUseCase'
import IAuthRepository from '../../../src/auth/domain/IAuthRepository'
import IPasswordService from '../../../src/auth/services/IPasswordService'
import FakeRepository from '../helpers/FakeRepository'
import FakePasswordService from '../helpers/FakePasswordService'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)

describe('SignInUseCase',()=>{
    let sut:SignInUseCase
    let repository:IAuthRepository
    let passwordService:IPasswordService

    const user = {
        email: 'ali@gmail.com',
        id:'1234',
        name:"ali",
        password:'$2b$10jk$l.kjhohgiu',
        type:"email"
    }
    beforeEach(()=>{
        repository= new FakeRepository
        passwordService = new FakePasswordService
        sut = new SignInUseCase(repository,passwordService) 
    }

    )
    it('should throw error where user is not found', async() =>{
        const user = {email:'wrong@email.com',password:'12345'}
        //assert
        await expect(sut.execute(user.email,user.password)).to.be.rejectedWith('User Not Found')
    }

    )
}

)

function beforeEach(arg0: () => void) {
    throw new Error('Function not implemented.')
}
