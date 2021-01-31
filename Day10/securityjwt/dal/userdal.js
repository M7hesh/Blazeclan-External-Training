const {Sequelize, DataTypes, Model}  =  require('sequelize');
let path = require('path');

let jwt = require('jsonwebtoken');

// JWT Secret key creation
const jwtSettings = {
    jwtSecret: 'sbisecret007700tercesibs'
};


const sequelize = new Sequelize("Company", "root", "M@heshmlo", {
    host: 'localhost',  
    dialect:'mysql',  
    pool: { 
       max:5,    
       min: 0,   
       idle: 10000   
    },
    define: {  
          timestamps:false   
    }
});

// @ts-ignore
const users = require(path.join(__dirname, './../../models/employee'))(sequelize, Sequelize.DataTypes);
// @ts-ignore
const depts = require(path.join(__dirname, './../../models/department'))(sequelize, Sequelize.DataTypes);
class UserDal{
    async createUser(req,resp){
        let newuser = {
            Id:req.body.Id,
            UserName: req.body.UserName,
            Passwords:req.body.Passwords,
            Email:req.body.Email
        };

        // conect to sb using sequelize
        await sequelize.sync({force:false});

        // check if the user already exists
        const find = await users.findOne({where:{UserName:newuser.UserName}});
        if(find !== null) // conflict
            return resp.status(409).send({response:`${newuser.UserName} is already present`});
        
        // create a user
        const created = await users.create(newuser);
        return resp.status(201).send({response: created}); 
    }
    async authUser(req,resp){
        let userInfo = {
            UserName: req.body.UserName,
            Passwords:req.body.Passwords,
        };

        // conect to sb using sequelize
        await sequelize.sync({force:false});

        // find the user
        const find = await users.findOne({where:{UserName:userInfo.UserName}});  
        if(find === null) // not found
            return resp.status(409).send({response:`Sorry! ${userInfo.UserName} is not found`});        
        // check for password
        if(find.Passwords.trim() !== userInfo.Passwords.trim()) // unauthorized
            return resp.status(401).send({response:`Sorry!! Password for ${userInfo.UserName} is incorect`});

        // authorize the user  
        // if the user is authenticated then
        // sign the user using the jwt provider and with the secret
        // userInfom is 'payload' that is the credential info that will be added in the 
        // SingInOptions's 'subject' property
        // Secret Key for sign-in the token, this is set using jwtSettings.jwtSecret
        // SingInOptions, expiresIn, the value in seconds  
        const token  = jwt.sign({userInfo}, jwtSettings.jwtSecret, {
            expiresIn:3600
        });
        return resp.status(200).send({
            response: `Login Successful for ${userInfo.UserName}`,
            authenticated: true,
            token:token
        });    
    }
    async getDepts(req,resp){
           
        // 1. receive the token from the header
        // headers: {'AUTHORIZATION': 'Bearer <TOKEN>'}

        console.log(`Received data ${req.headers.authorization}`);


        if(req.headers.authorization !== undefined) {
            let receivedToken = req.headers.authorization.split(" ")[1];
            // 2. verify the token
            // Parameters
            // 1--> The token received from request header for  AUTHORIZATION
            // 2--> The secret that was used while the token was generated
            // 3--> The callback, that will be used to provide the status of token
            // verification to the server. If the token vwerification is failed, the 
            // error information will be given to server (host) and server has to 
            // respond accroindly
            // the callback has the 'decode' parameter that will be used to infor to the
            // server that the token is verified successfully and the server can send the 
            // response 
            // since the await is used in the callback function, the function
            // is decorated as 'async'
            await jwt.verify(receivedToken, jwtSettings.jwtSecret, async (error, decoded)=>{
                if(error) 
                    return resp.status(401).send({response: `Authentication failed ${error}`});
             // conect to db using sequelize
             req.decoded = decoded; // the request is verified suuccfully
              await sequelize.sync({force:false});
              const find = await depts.findAll();
              return resp.status(200).send({response:find});    
            });
        } else {
            return resp.status(401).send({response: `Authentication failed because AUTHORIZATION Header is issing`});
        }
      
    }
     
}

module.exports = UserDal;