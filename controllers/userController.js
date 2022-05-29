const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


exports.getAllUsers = async ( req , res ) => {
    try {
        const users = await prisma.utilisateur.findMany({})
        return res.json(users)
    } catch(err) {
        console.log(err)
        return res.status(400).send({message : "Bad Request !"})
    }
}

exports.getUserById = async ( req , res ) => {
    const {id} = req.params
    
    try {
        const user = await prisma.utilisateur.findUnique({
            where : {
                id: parseInt(id)
            },
        })

        if (user) return res.json(user)
        return res.status(404).send({message : "User not found !"})
    } catch(err) {
        console.log(err)
        return res.status(400).send({message : "Bad Request !"})
    }
}



exports.addUser = async ( req , res ) => {
    let {nom,email,password,role} = req.body

    try {
        if (!role) role = "AUTHOR"
        const newUser = await prisma.utilisateur.create({
            data : {
                nom : nom,
                email : email,
                password : password,
                role : role
            },
        })

        if (newUser) return res.json(newUser)
        return res.status(400).send({message : "Bad Request !"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message : "Internal server problem !"})
    }
}



exports.deleteUserById = async ( req , res ) => {
    const {id} = req.params

    try {

        

        const deletedUser = await prisma.utilisateur.delete({
            where : {
                id : parseInt(id)
            }
        })

        if (deletedUser) return res.status(204).send()
        return res.status(400).send({message : "Bad Request !"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({message : "Server Internal Error"})
    }
}


exports.updateUser = async ( req , res ) => {
    const {id} = req.params
    const {nom,email,password} = req.body


    try {
        const updatedUser = await prisma.utilisateur.update({
            where : {
                id : parseInt(id)
            } ,
            data : {
                nom : nom,
                email : email,
                password : password,
            }
        })

        if ( updatedUser ) return res.status(204).send({message : "User updated successfully !"})
        return res.status(400).send({message : "Bad Request !"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message : "Internal Server Error !"})
    }
}



