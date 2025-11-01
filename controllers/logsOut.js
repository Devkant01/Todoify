async function logsOut(req, res) {
    req.session.token = null;
    req.session.user = undefined;
    res.redirect('/');
}

module.exports = {
    logsOut
}