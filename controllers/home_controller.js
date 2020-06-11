const Post = require('../models/post');

module.exports.home = function(request,response){
    // console.log(request.cookies);
    // response.cookie('user_id',25);
    
    // Post.find({},function(err,posts){
    //     return response.render('home',{
    //         title: "Home",
    //         posts: posts
    //     });
    // });

    Post.find({}).populate('user').exec(function(err,posts){
        return response.render('home',{
            title: "Home",
            posts: posts
        });
    });
    
}