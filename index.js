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

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}
app.use(errorHandler)

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

app.get('/api/persons/:id', (req, res, next) => {
    Entry.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name or number missing"
        })
    }

    const person = new Entry({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Entry.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Entry.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})