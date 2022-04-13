const member = require('../models/MemberSchema');


// MEMBER SIGNUP | MEMBER REQUESTS
exports.MemberSignUp = async (req, res) => {
    const {
        rollId
    } = req.body;

    await member.findOne({ rollId: rollId }).exec((error, x) => {
        if (x) {
            return res.status(400).json({ msg: "user alradey registered..." });
        }

        const {
            Dept,
            Name,
            phone,
            presentAddress,
            parmanentAddress,
            school,
            college,
            upazilla,
        } = req.body;

        let series = rollId[0] + rollId[1];

        const obj = new member({
            rollId,
            series,
            Dept,
            Name,
            phone,
            presentAddress,
            parmanentAddress,
            school,
            college,
            upazilla,
        });


        obj.save((error, member) => {
            if (member) {
                return res.status(201).json({
                    member,
                    message: "member request success...",
                });
            }
            else {
                console.log(error);
            }
        });

    })


}




// DISPLAY ALL | VALID MEMBER
exports.showMember = (req, res) => {
    member.find({ type: 'valid' }).exec((error, members) => {
        if (members) {
            return res.status(200).json({
                members
            });
        }
        else {
            console.log(error);
        }
    })
}



// DISPLAY ALL | INVALID MEMBER || SHOW MEMBER REQUESTS
exports.memberRequest = async (req, res) => {
    member.find({ type: 'invalid' }).exec((error, members) => {
        if (members) {
            return res.status(200).json({
                members
            });
        }
        else {
            console.log(error);
        }
    })
}



// ACCEPT A PARTICULAR | MEMBER REQUESTS
exports.acceptMemberRequest = async (req, res) => {
    const { rollId } = req.body;

    member.findOneAndUpdate({ rollId: rollId }, { type: "valid" },
        null, function (err, mem) {
            if (err) {
                return res.status(400).json({
                    "error": err
                });
            }
            else {
                return res.status(200).json({
                    mem
                });
            }
        });

}

exports.deleteAMember = async (req, res) => {
    const { _id } = req.body;
    await member.deleteOne({ _id: _id },
        { new: true }).exec((err, m) => {
            if (err) {
                return res.status(400).json({ err })
            }
            if (m) {
                return res.status(200).json({ m });
            }
        });
}





// DISPLAY DETAILS OF A PARTICULAR MEMBER
exports.showIndivisualMember = (req, res) => {
    const { rollId } = req.body;
    member.findOne({ rollId: rollId }).exec((error, members) => {
        if (members) {
            return res.status(200).json({
                members
            });
        }
        else {
            return res.status(400).json({
                "error : ": error
            });
        }
    })
}


//DISPLAY MEMBER TO THE USER

exports.MemberSignIn = (req, res) => {
    const { rollId, phone } = req.body;
    member.findOne({ rollId: rollId, phone: phone }).exec((error, members) => {
        if (members) {
            if (members.type === "valid") {
                return res.status(200).json({
                    members
                });
            }
            else {
                return res.status(400).json({
                    "msg": "invalid user..."
                });
            }

        }
        else {
            return res.status(401).json({
                "error": error
            });
        }
    })
}