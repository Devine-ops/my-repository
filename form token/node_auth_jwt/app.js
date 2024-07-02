/* imports */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//configurar json response

app.use(express.json())

//Models
const User = require('./models/User')


//rota aberta - rota publica
app.get('/', (req, res) =>{

    res.status(200).json({msg: 'Bem vinda a nossa API!'})

})

//rota privada

app.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id

// checar se o usuário existe

    const user = await User.findById(id, '-password')

    if (!user){
        return res.status(404).json({msg: 'Usuário não encontrado!'})

    }

    res.status(200).json({user})
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({msg: 'Acesso negado!'})

    }

    try {

        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    } catch (error){
        res.status(400).json({msg: "Token invalido!"})
    }

}

//registrar ussuário
app.post('/auth/register', async(req, res) => {

    const {name, email, password, confirmpassword} = req.body


 //validações
 if (!name) {
    return res.status(422).json({msg: 'O nome é obrigatório!'})        
 }
 
 if (!email) {
    return res.status(422).json({msg: 'O email é obrigatório!'})  
}

if (!password) {
    return res.status(422).json({msg: 'A senha é obrigatório!'})  
}

if (password !== confirmpassword) {

    return res.status(422).json({msg: 'As senhas devem ser iguais!'})

}

//else{
     //return res.status(200).json({msg: 'Ok!'})
//}

//checar se o usuário já existe no banco de dados
const userExists = await User.findOne({email: email})

if (userExists) {
    return res.status(422).json({msg: 'Use um outro E-mail!'})

}

//criar senha

const salt = await bcrypt.genSalt(12)
const passwordHash = await bcrypt.hash(password, salt)

//criar usuario 
const user= new User({
    name,
    email,
    password: passwordHash,
})

try {

    await user.save()
    res.status(201).json({msg: 'Usuário criado com sucesso!'})

} catch(error) {

    res.status(500).json({msg: 'error'})
}

})

//login usuário

app.post("/auth/login", async (req, res) => {
    const {email, password} = req.body

    //validação 
if (!email) {
    return res.status(422).json({msg: 'O email é obrigatório!'})  
}
    
if (!password) {
    return res.status(422).json({msg: 'A senha é obrigatório!'})  
}

//checar se o usuáreio existe 

const user = await User.findOne({email: email})

if (!user) {
    return res.status(404).json({msg: 'Usuário não encontrado!'})

}

//checar se a senha do usuário coincidem
const checkPassword = await bcrypt.compare(password, user.password)

if (!checkPassword){
    return res.status(422).json({msg: 'Senha inválida!'})  

} //else {
    //return res.status(200).json({msg: 'OK!'})
//}

try {
    const secret = process.env.SECRET

    const token = jwt.sign(
    {
        id: user._id,
    }, 
    secret,
    )
    console.log(process.env.SECRET)
    res.status(200).json({msg: 'Autenticação realizada com suceso', token})

} catch (error) {

    console.log(error)

    res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'})

}


})


//credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS 


mongoose
.connect(`mongodb+srv://vinicius512sul:SZtKXgGYBPACcLRf@cluster0.bkbyjpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    app.listen(3000)
    console.log('Conectou ao banco de dados!')
})
.catch((err) => console.log(err))




