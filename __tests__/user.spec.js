
const usersController = require('../controllers/usersController')
const bcrypt = require('bcryptjs')


describe('Register new user', ()=>{
    let testUser = {
        firstName: "first", 
        lastName:"last", 
        email:"test@test.com", 
        password:"thisIsATest", 
        role:"customer"
        }
    test('register new user should write user to db', ()=>{

        expect(usersController.newUser(testUser)).toBe({
            firstName:testUser.firstName,
            lastName: testUser.lastName,
            email:testUser.email,
            rentals:[],
            history:[],
            accountStatus: "active",
            role:testUser.role,
            hash:bcrypt.hash(testUser.password, 10),
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
    }) 
})