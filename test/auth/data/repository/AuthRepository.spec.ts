import chai ,{expect} from 'chai'
import mongoose  from "mongoose"
import AuthRepository from "../../../../src/auth/data/repository/AuthRepository"
import dotenv from 'dotenv'

dotenv.config()
describe('AuthRepository',()=>{
    let client:mongoose.Mongoose
    let sut : AuthRepository
    beforeEach(()=>{
        client= new mongoose.Mongoose()
        const connectionStr = encodeURI(process.env.TEST_DB as string)
        client.connect(connectionStr,{
            
            
        })
        sut = new AuthRepository(client)
     
    })

    afterEach(()=>{
        client.disconnect()
    })
    it('should return user when email is found', async()=>{
       // arrange
        const email = 'mail@mail.com'
        const pass = 'pass'
       //act 
       const result = await sut.find(email)
       //expect
       expect(result).to.not.be.empty
    })

    it('should return userid when user added to db', async()=>{

        const user = {
            email: 'ali@gmail.com',
            id:'1234',
            name:"ali",
            password:'$2b$10jk$l.kjhohgiu',
            type:"email"
        }
        const result= await sut.add(
            user.name ,
             user.email,
             user.password, 
              user.type
            )
        
            expect(result).to.not.be.empty
        
        })
}


)
