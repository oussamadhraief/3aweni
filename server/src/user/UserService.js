const User= require('./UserModel');
const bcrypt= require("bcryptjs");


const register = async (email, password, name, phone) => {
    try {
        
        const user = await User.findOne({ email })
        if(user) throw new Error('User already exists')
      
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            name,
            phone,
            password: hashedPassword,
        })

        await newUser.save()
        
        return newUser

    } catch (error) {

        console.log(error);
        
    }
}


exports.register = register