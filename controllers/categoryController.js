const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


exports.getAllCategories = async ( req , res ) => {
    try {
        const category = await prisma.categorie.findMany({})
        return res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(400).send({message : "Bad Request !"})
    }
}

exports.getCategoryById = async ( req , res ) => {
    const {id} = req.params

    try {
        const category = await prisma.categorie.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if (category) return res.json(category)
        return res.status(404).send({message : "Category not found!"})

    } catch (error) {
        console.log(error)
        return res.status(500).send({message : "Server Internal Error !"})
    }
}

exports.addCategory = async ( req , res ) => {
    const {nom} = req.body
    
    
    try {
        const newCategory = await prisma.categorie.create({
            data : {
                nom : nom
            },
        })

        if (newCategory) return res.json(newCategory)
        return res.status(400).send({message : "Bad Request !"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message : "Internal server problem !"})
    }
}


exports.deleteCategoryById = async ( req , res ) => {
    const {id} = req.params

    try {
        const deletedCategory = await prisma.categorie.delete({
            where : {
                id : parseInt(id)
            }
        })

        if (deletedCategory) return res.status(202).send({message : "Category deleted successfully!"})
        return res.status(404).send({message : "Category not found!"})
    } catch (error) {
        console.log(error)
        return res.status(400).send({message : "Bad request !"})
    }
}


exports.updateCategory = async ( req , res ) => {
    const {id} = req.params
    const {nom} = req.body

    try {
        const updatedCategory = await prisma.categorie.update({
            where : {
                id : parseInt(id)
            } ,
            data : {
                nom : nom
            }
        })

        if (updatedCategory) return res.status(204).send({message : "Category Updated Successfully"})
        return res.status(400).send({message : "Bad Request!"})
    } catch(err) {
        console.log(err)
        return res.status(500)
    }
}




