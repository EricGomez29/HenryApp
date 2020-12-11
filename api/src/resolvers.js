import User from './models/Users';
import bcrypt from 'bcrypt';
import { createToken } from './services';
import Cohorte from './models/Cohorte';
import nodemailer from "nodemailer";

const resolvers = {
    Query: {
        //USERS
        users: async (parent, { where }, context) => await User.find(where).exec(),
         //AUTH
       
        me: (_, __, { req }) => {
            if (!req.userId) {
              return null;
            }
      
            return User.findOne(req.userId);
          },
        //COHORTES
        cohortes: async (parent, { where }, context) => await Cohorte.find(where).exec(),
             //Enviar Email
       
    },

    Mutation: {

        //USERS
        registerUser: async (_, {username,firstName, lastName, cohorte,email, password }, res) => {
             const hash = await bcrypt.hash(password, 9);
            return await User.create( {username, firstName,lastName,cohorte,email,password: hash} )
        },
        login: async(_, { email, password }, res) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error("No hay usuario con ese email");
            }
            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error("Incorrect password");
            }
            
              return createToken(user, res);
        },
        editUser: async (parent, { input }, context, req) => await  (User.updateOne({ "username": input.username }, input)),
        removeUser: async (parent, { username }, context) => await  User.findOneAndRemove({"username":username}),
        
        
        
        //COHORTES
        addCohorte: async (parent, { input }, context) => await Cohorte.create(input),
        addUserCohorte: async (parent, { number, username }, context) =>  {
            console.log(`${number} ${username}`);
            const user = await User.find({"username": username});
            if (user.length === 0){
                throw new Error (`El Usuario ${username} no existe.`);
            };    
            console.log(parseInt(number) ===  user[0].cohorte);
            console.log( user[0].cohorte);
            console.log(parseInt(number));
            if (parseInt(number) ===  user[0].cohorte){
                throw new Error (`El Usuario ${username} pertenece a este Cohorte.`);
            
            }else if (parseInt(number) < user[0].cohorte){
                throw new Error (`No se puede agregar usuarios a Cohortes anteriores`);
            }
            // Busco si existe el cohorte
            const cohorte = await Cohorte.findOne({"Number": number})
            if (!cohorte){
                throw new Error("El Cohorte no existe")
            }
            // Guardo el username de ese alumno en el array Users de Cohorte
            await User.findOneAndUpdate({"username": username}, {"cohorte": number})
            await Cohorte.findOneAndUpdate({"Number": number},
            {
                $push : {
                    Users : {username} 
                }
            });
            console.log(await Cohorte.findOneAndUpdate({"Number": user[0].cohorte},
            {
                $pull : {
                    Users : {username} 
                }
            }));
            
            return await Cohorte.findOne({"Number": number});
        },

     

        // removeUserCohorte: async (parent, { number, username })
        // sendEmail:async (parent, { email }, context) =>  {
        //     console.log(email);
        //     let transporter = nodemailer.createTransport({
        //         auth: {
        //             user: "facugs2090@gmail.com",
        //             pass: 'mundomitomano123'
        //         },
        //       });
            
        //       // send mail with defined transport object
        //       let info = await transporter.sendMail({
        //         from: '"Fred Foo 👻" <foo@example.com>', // sender address
        //         to: "facugs2090@gmail.com", // list of receivers
        //         subject: "Hello ✔", // Subject line
        //         text: "Hello world?", // plain text body
        //         html: "<b>Hello world?</b>", // html body
        //       });

        //       transporter.sendMail(mailOptions, function(error, info){
        //         if (error){
        //             console.log(error);
        //             res.send(500, err.message);
        //         } else {
        //             console.log("Email sent");
        //             res.status(200).jsonp(req.body);
        //         }
        //     });
        //       console.log("Enviado");
        //       return info;
        //     }
    }

    
    
}
        
        
    


export default resolvers;
