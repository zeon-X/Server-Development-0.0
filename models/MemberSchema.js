const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    rollId: {
        type: String,
        required: true,
    },
    series: {
        type: String,
    },
    Dept: {
        type: String,
    },
    Name: {
        type: String,
    },
    phone: {
        type: String,
    },
    presentAddress: {
        type: String,
    },
    parmanentAddress: {
        type: String,
    },
    school: {
        type: String,
    },
    college: {
        type: String,
    },
    upazilla: {
        type: String,
    },

    type: {
        type: String,
        enum: ['valid', 'invalid'],
        default: 'invalid'
    },

    presentBookList: [{
        BookID: {
            type: String,
        }
    }],
    presentBookList: [{
        BookID: {
            type: String,
        }
    }],



});

const m = mongoose.model('Member', memberSchema);
module.exports = m;