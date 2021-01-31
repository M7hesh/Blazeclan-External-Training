const {Sequelize, DataTypes, Model}  =  require('sequelize');
let path = require('path');
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
const users = require(path.join(__dirname, './../../models/Users'))(sequelize, Sequelize.DataTypes);
// @ts-ignore
const depts = require(path.join(__dirname, './../../models/Department'))(sequelize, Sequelize.DataTypes);
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

        // authorize the user and set the session info for the auth user
        req.session.loggedin = true;
        req.session.name = userInfo.UserName;
        console.log(`The current session is for user ${req.session.name}`);
        return resp.status(200).send({response: `Login Successful for ${userInfo.UserName}`});    
    }
    async getDepts(req,resp){
          // please do not send the departments response if the
          // session name is not present in the request
          if(req.session.name === undefined)
                return resp.status(401).send({response: `Session Is expired please login in again`})    

          // conect to sb using sequelize
          await sequelize.sync({force:false});
          const find = await depts.findAll();
          return resp.status(200).send({response:find});
    }
    async logout(req,resp){
        req.session.destroy();
        return resp.status(200).send({response: 'Successful logout'});
    }
}

module.exports = UserDal;