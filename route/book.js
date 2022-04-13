const express = require('express');
const { addBook, showBooks, bookToGive, bookToReturn, booksAtStock, booksHasGiven } = require('../controller/book');
const router = express.Router();

router.post('/admin/addNewBook', addBook);
router.get('/admin/showBooks', showBooks);
router.post('/admin/book/give', bookToGive);
router.post('/admin/book/return', bookToReturn);
router.get('/admin/book/atStock', booksAtStock);
router.get('/admin/book/hasgiven', booksHasGiven);
module.exports = router;