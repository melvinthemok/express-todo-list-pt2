const Todo = require('../models/todo')
const express = require('express')
const router = express.Router()

// CREATE

router.get('/new', (req, res) => {
  res.render('todos/new')
})

router.post('/', (req, res) => {
  Todo.create({
    name: req.body.name,
    description: req.body.description || req.body.name,
    completed: req.body.completed || false
  }, (err, item) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.redirect('/todos/' + item._id)
    }
  })
})

// test code
// curl -XPOST -H "Content-Type: application/json" -d '{"name":"Buy Cake","description":"you can never have too much"}' http://localhost:3000/todos

// READ
// List

router.get('/', (req, res) => {
  Todo.find({}, (err, itemsList) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.render('todos/index', { itemsList: itemsList })
    }
  })
})

// test code
// curl -XGET http://localhost:3000/todos

// Show

router.get('/:idx', (req, res) => {
  Todo.findById(req.params.idx, (err, item) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.render('todos/id', { item: item })
    }
  })
})

// test code
// curl -XGET http://localhost:3000/todos/[CHOOSE AN ID NUMBER]

// UPDATE

router.get('/edit/:idx', (req, res) => {
  Todo.findById(req.params.idx, (err, item) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.render('todos/edit/id', { item: item })
    }
  })
})

router.put('/:idx', (req, res) => {
  if (req.body.completed === 'true') {
    req.body.completed = true
  } else {
    req.body.completed = false
  }
  Todo.findOneAndUpdate({ _id: req.params.idx }, req.body, (err, data) => {
    if (err) {
      console.log(err)
      return
    } else {
      console.log(data)
      res.redirect('/todos/' + data._id)
    }
  })
})

// test code
// curl -XPUT -H "Content-Type: application/json" -d '{"name":"Buy Cheese Cake"}' http://localhost:3000/todos/[CHOOSE AN ID NUMBER]

// DESTROY
// Destroy a todo

router.delete('/:idx', (req, res) => {
  Todo.findOneAndRemove({ _id: req.params.idx }, (err) => {
    if (err) {
      console.log(err)
      return
    } else {
      res.redirect('/todos/')
    }
  })
})

// test code
// curl -XDELETE http://localhost:3000/todos/[CHOOSE AN ID NUMBER]

// // Destroy all todos
//
// router.delete('/', (req, res) => {
//   Todo.remove({}, (err) => {
//     if (err) {
//       console.log(err)
//       return
//     } else {
//       res.send('All deleted.')
//     }
//   })
// })

module.exports = router
