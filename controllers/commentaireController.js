const {PrismaClient} = require('@prisma/client')
const cookieParser = require('cookie-parser')

const prisma = new PrismaClient()



exports.getAllComments = async ( req , res ) => {
    let { take , skip } = req.query
    const {articleId} = req.params

    try {
        const comments = await prisma.commentaire.findMany({
            take : take ? parseInt(take) : undefined,
            skip : skip ? parseInt(skip) : undefined,
            where : {
                articleId : parseInt(articleId)
            }
        })

        
        return res.status(200).send(comments)
        
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({message : "Bad Request !"})
    }
}


exports.addComment = async (req , res ) => {
    const {articleId} = req.params
    const {email , contenu} = req.body

    if ( email && contenu ) {
        try {
            const newComment = await prisma.commentaire.create({
                data : {
                    email : email ,
                    contenu : contenu ,
                    articleId : parseInt(articleId)
                }
            })

            if (newComment) return res.status(203).send(newComment)
            return res.status(400).send({message: "Bad Request !"})
        } catch (error) {
            console.log(error)
            return res.status(500).send({message : "Internal Server Error !"})
        }
    }
}


exports.deleteComment = async (req , res ) => {
    const {id} = req.params

    try {
        const deletedComment = await prisma.commentaire.delete({
            where : {
                id : parseInt(id)
            }
        })

        if (deletedComment) return res.status(204).send()
        return res.status(400).send({message : "Bad Request !"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message : "Internal Server Error!"})
    }
}

exports.updateComment = async (req ,res) => {
    const {id} = req.params
    const {contenu} = req.body

    try {
        const updatedComment = await prisma.commentaire.update({
            where : {
                id : parseInt(id)
            } ,

            data : {
                contenu : contenu
            }
        })

        if (updatedComment) return res.status(204).send({message : "Comment Updated Successfully!"})
        return res.status(400).send({message : "Bad Request !"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message : "Internal Server Error!"})
    }
}