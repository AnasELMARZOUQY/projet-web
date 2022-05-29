const {PrismaClient} = require('@prisma/client')
const { faker } = require('@faker-js/faker')
const {shuffleArray} = require('../utils/utils')

const prisma = new PrismaClient()


const main = async () => {
    // Clearing Database
    await prisma.utilisateur.deleteMany({})
    await prisma.categorie.deleteMany({})
    // await prisma.utilisateur.deleteMany({})

    // Generate an ADMIN user
    await prisma.utilisateur.create({
        data : {
            id : 1,
            nom : faker.name.findName(),
            email : faker.internet.email(),
            password : faker.internet.password(),
            role : "ADMIN"
        }
    })

    // Generate 10 AUTHOR Users
    for (let i = 2 ; i < 12 ; i++ ) {
        await prisma.utilisateur.create({
            data : {
                id : i,
                nom : faker.name.findName(),
                email : faker.internet.email(),
                password : faker.internet.password(),
                role : "AUTHOR"
            }
        })
    }

    // Generate 10 categories
    for (let i = 1 ; i < 11 ; i++) {
        await prisma.categorie.create({
            data : {
                id : i,
                nom : faker.commerce.department()
            }
        })
    }

    // Generate 100 articles
    for (let i = 1 ; i < 101 ; i++) {
        const helperArray = [1,2,3,4,5,6,7,8,9,10]
        shuffleArray(helperArray)

        await prisma.article.create({
            data : {
                id : i,
                titre : faker.random.words(4),
                image : faker.image.imageUrl(),
                contenu : faker.lorem.paragraphs(6),
                authorId : Math.floor(Math.random() * 10) + 1,
                categories : {
                    connect : [
                        { id : helperArray[0]},
                        { id : helperArray[1]},
                        { id : helperArray[2]},
                        { id : helperArray[3]},
                    ]
                }
            }
        })
    }


    // Generate 0 to 20 comments for each Article
    for (let i = 1 ; i < 101 ; i++) {
        const rand = Math.floor(Math.random() * 21)
        for (let j = 1 ; j < rand + 1 ; j++ ) {
            await prisma.commentaire.create({
                data : {
                    email : faker.internet.email(),
                    contenu : faker.lorem.sentence(),
                    articleId : i
                }
            })
        }
    }



}


main()
    .catch( err => {
        console.log(err)
        process.exit(1)
    })
    .finally( () => {
        prisma.$disconnect
    })