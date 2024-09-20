import IAuthRepository from "../../../src/auth/domain/IAuthRepository";
import User from "../../../src/auth/domain/User";

export default class FakeRepository implements IAuthRepository{
    public users = [
        {
            email: 'ali@gmail.com',
            id:'1234',
            name:"ali",
            password:'$2b$10jk$l.kjhohgiu',
            type:"email"
        },
        {
            email: 'ali1@gmail.com',
            id:'1235',
            name:"ali",
            password:'$2b$10jk$l.kjhohgiu',
            type:"google"
        }
      
      
    ]
   
   public async find(email: string): Promise<User> {
    const user = this.users.find((x)=> x.email===email)
    if(!user) return Promise.reject('User Not Found')
        return new User(
     user?.id,
     user?.name, 
     user?.email,
     user?.password,
     user?.type

        )
    }
  public async  add(
    name: string,
     email: string,
      password: string,
       type: string
    ): Promise<string> {
      const max = 9999
      const min = 1000
      const id = (Math.random()* (+max - +min)).toString()
      
      this.users.push(
        {
            id:id,
            name:name,
            type:type,
            email:email,
            password : password

        }
      )
      return id 
    }
    
}