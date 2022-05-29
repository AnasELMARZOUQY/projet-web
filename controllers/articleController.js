const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()



exports.getAllArticles = async ( req , res ) => {
    let { take , skip } = req.query

    try {

        const article = await prisma.article.findMany({
            take : take ? parseInt(take) : undefined,
            skip : skip ? parseInt(skip) : undefined,
            include : {
                author : {
                    select : {
                        nom : true
                    }
                }
            }
        })

        
        return res.status(200).send(article)
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({message : "Bad Request !"})
    }
}


exports.getArticleById = async ( req , res ) => {
    const {id} = req.params
    try {
        const article = await prisma.article.findUnique({
            where : {
                id : parseInt(id)
            } ,
            include : {
                author : {
                    select : {
                        nom : true
                    }
                }
            }
        })


        if (article) return res.status(200).json(article)
        return res.status(404).send({message : "Article not found!"})
    } catch (error) {
        console.log(error)
        return res.status(400).send({message : "Bad Request !"})
    }
}


exports.addArticle = async ( req , res ) => {
    const {titre, image , contenu , authorId , categorieArray } = req.body

    if (titre && image && contenu && authorId) {
        try {
            const categories = categorieArray.map( categorie => {
                return { id: parseInt(categorie) } 
            })

            



            const newArticle = await prisma.article.create({
                data : {
                    titre : titre,
                    image : image,
                    contenu : contenu,
                    authorId : parseInt(authorId),
                    categories : {
                        connect : categories
                    }
                }
            })

            if (newArticle) return res.status(203).json(newArticle)
            return res.status(400).send({message : "Bad Request!"})
        } catch (error) {
            console.log(error)
            return res.status(500).send({message : "Internal Server Error !"})
        }
    } else {
        return res.status(400).send({message : "Bad Request !"})
    }
}

exports.deleteArticleById = async ( req , res ) => {
    const {id} = req.params

    try {
        // const deleteComments = await prisma.article.update({
        //     where : {
        //         id : parseInt(id)
        //     } ,
        //     data : {
        //         commentaires : {
        //             deleteMany : {}
        //         }
        //     }
        // })
        const deletedArticle = await prisma.article.delete({
            where : {
                id : parseInt(id)
            }
        })
        if (deletedArticle) return res.status(204).send()
        return res.status(400).send({message : "Bad Request !"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({message : "Internal Server Error"})
    }
}


exports.updateArticle = async ( req , res ) => {
    const {id} = req.params
    const {titre, image , contenu  , categorieArray } = req.body

    if (titre && image && contenu ) {
        try {
            const categories = categorieArray.map( categorie => {
                return { id: parseInt(categorie) } 
            })


            const updatedArticle = await prisma.article.update({
                where : {
                    id : parseInt(id)
                } ,

                data : {
                    titre : titre,
                    image : image,
                    contenu : contenu,
                    categories : {
                        set : categories
                    }
                }
            })

            if (updatedArticle) return res.status(204).send({message : "Article updated successfully !"})
            return res.status(400).send({message : "Bad Request !"})
        } catch (error) {
            console.log(error)
            return res.status(500).send({message : "Internal Server Error!"})
        }
    }
}





