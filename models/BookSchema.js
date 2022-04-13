const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    BookName: {
        type: String,
        required: true,
    },
    AuthorName: {
        type: String,
    },
    BookID: {
        type: String,
    },
    BelongsTo: {
        type: String,
        default: "none"
    },
    GivenDate: {
        type: Date,
    }
});

const b = mongoose.model('Book', bookSchema);
module.exports = b;