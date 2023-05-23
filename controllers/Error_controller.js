module.exports.Error = function(req,res){
    return res.render('error',{
        title: 'Error Page'
    })
}