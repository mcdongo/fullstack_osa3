const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url =
    `mongodb+srv://fullstack:${password}@fullstack.pkqxv.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.connect(url)

const entrySchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length === 3) {
    console.log("phonebook:")
    Entry.find({}).then(result => {
        result.forEach(entry => {
            console.log(`${entry.name} ${entry.number}`)
        })
        mongoose.connection.close()
    })
}
  

if (process.argv.length>=4) {
    const entry = new Entry({
        id: Math.round(Math.random()*1000),
        name: process.argv[3],
        number: process.argv[4]
    })
    entry.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}