//setup the cotroller function.
module.exports.home = function(req,res){
    return res.render('home', {
        title: 'Home'
    })
}
