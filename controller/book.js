const book = require('../models/BookSchema');


exports.addBook = async (req, res) => {
    const {
        BookName,
        AuthorName,
    } = req.body;

    //let cnt = await book.estimatedDocumentCount() + 1;
    //await collections_name.estimatedDocumentCount() returns the total documents in the collection;

    let BookID = "";
    for (let i = 0; i < BookName.length; ++i) {
        BookID += BookName[i];
        if (BookName[i] == ' ') break;
    }
    let num = Math.floor(Math.random() * 1000000);
    BookID = BookID + "_" + num;




    const obj = new book({
        BookName,
        AuthorName,
        BookID,
        BelongsTo
    });
    //BOOK OBJ MOCK 


    await obj.save((error, book) => {
        if (book) {
            return res.status(201).json({
                message: "done...",
            });
        }
        else {
            return res.status(400).json({
               error
            });
        }
    });


}


exports.showBooks = (req, res) => {
    book.find().exec((error, book) => {
        if (book) {
            return res.status(200).json({
                book
            });
        }
        else {
            console.log(error);
        }
    })
}







exports.bookToGive = async (req, res) => {
    const { BookID, BelongsTo } = req.body;
    book.findOneAndUpdate({ BookID: BookID }, { BelongsTo: BelongsTo },
        null, function (err, book) {

            if (err) {
                return res.status(400).json({
                    "error": err
                })
            }
            else if (book) {
                return res.status(201).json({
                    "msg": "updated done"
                })
            }
            else {
                console.log("working");
                return res.status(405).json({
                    "msg": "Alradey belongs to someone"
                })
            }
        })
}



exports.bookToReturn = async (req, res) => {
    const { BookID } = req.body;
    book.findOneAndUpdate({ BookID: BookID }, { BelongsTo: "none" },
        null, (err, book) => {
            if (err) {
                return res.status(400).json({
                    "error ": err
                })
            }
            else {
                return res.status(201).json({
                    "msg": "book returned successfully"
                })
            }
        })
}











exports.booksAtStock = async (req, res) => {
    book.find({ BelongsTo: "none" }).exec((error, book) => {
        if (book) {
            return res.status(200).json({
                book
            });
        }
        else {
            return res.status(400).json({
                "error": error
            });
        }
    })
}


exports.booksHasGiven = async (req, res) => {
    book.find({ BelongsTo: { $ne: "none" } }).exec((error, book) => {
        if (book) {
            return res.status(200).json({
                book
            });
        }
        else {
            return res.status(400).json({
                "error": error
            });
        }
    })
}