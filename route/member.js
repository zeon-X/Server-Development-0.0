const express = require('express');
const {
    MemberSignUp,
    showMember,
    memberRequest,
    acceptMemberRequest,
    showIndivisualMember,
    MemberSignIn,
    deleteAMember } = require('../controller/member');
const router = express.Router();

router.post('/member/signup', MemberSignUp);
router.get('/admin/member/valid', showMember);
router.get('/admin/member/Request', memberRequest);
router.post('/admin/member/acceptRequest', acceptMemberRequest);
router.post('/admin/member/delete', deleteAMember);
router.post('/admin/member/showProfile', showIndivisualMember);
router.post('/member/showProfile', showIndivisualMember);
router.post('/member/signin', MemberSignIn);

module.exports = router;