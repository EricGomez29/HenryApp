import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const auth = {
    // checkHeaders: (req,res,next) => { -----> tema a solucionar
    //     console.log(req.headers)
    //     next()
    // },

    getToken: ({_id}, secret) => {
        const token = jwt.sign({ user: _id }, secret, { expiresIn: '5d' })
        const refreshToken = jwt.sign({ user: _id }, secret, { expiresIn: '10m' })

        return [token, refreshToken];
    },

    login: async (email, password, User, ACCESS_TOKEN_SECRET) => {
        const user = await User.findOne({email})
        if(!user) {
            return {
                success: false,
                errors: [{path:"email", message:'Email no existe'}]
            }
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) {
            return {
                success: false,
                errors: [{path:"password", message:'Password inválido'}]
            }
        }

        const [token, refreshToken] = auth.getToken(user, ACCESS_TOKEN_SECRET)

        return {
            success: true,
            token,
            errors: []
        };
    }
}

export default auth;