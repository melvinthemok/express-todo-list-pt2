const mongoose = require('mongoose')
const todosController = require('./controllers/todos_controller')
const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const ejsLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/todo-list')
mongoose.Promise = global.Promise

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(ejsLayouts)

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/todos', todosController)

app.get('/', (req, res) => {
  res.render('index', { name: 'guest' })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
