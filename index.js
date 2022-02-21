require('dotenv').config()
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/entry')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.use(morgan('tiny'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-532523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    Entry.find({}).then(entries => {
        res.json(entries)
    })
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people
    </p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    Entry.findById(req.params.id).then(person => {
        res.json(person)
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name or number missing"
        })
    }

    const person = new Entry({
        id: Math.round(Math.random()*1000),
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})