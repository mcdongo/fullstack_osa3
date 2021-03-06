const mongoose = require('mongoose')


const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('Connected to mongodb')
    })
    .catch((error) => {
        console.log('Error connecting to mongodb', error.message)
    })

const entrySchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
})

entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema)