const User=require('./UserModel');

const register = async (email, password, name, phone) => {
    try {
        
        User.findOne({ email } , async (err,doc) => {
            if(err) throw err
            if(doc) res.status(400).send("User Already Exists")
            if(!doc) {
      
                const hashedPassword = await bcrypt.hash(password, 10)
                const newUser = new User({
                    email,
                    name,
                    phone,
                    password: hashedPassword,
                })
      
                await newUser.save()
      
                return newUser
            }
        })

    } catch (error) {

        throw new Error('Unable to create a new account')
        
    }
}


exports.register = register