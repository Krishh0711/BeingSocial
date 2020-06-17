const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = async function(request,response){
   try{
        await Post.create({
        content: request.body.content,
        user: request.user._id
       });
       request.flash('success','Post published!!');
       return response.redirect('back');
   }catch(err){
    request.flash('error',err);
       return response.redirect('back');
   }
  
}

//deleting post
module.exports.destroy = async function(request,response){

   try{
    let post = await Post.findById(request.params.id);
    // .id means converting the object id into string
    if(post.user == request.user.id){
        post.remove();

    await Comment.deleteMany({post:request.params.id});

    request.flash('success','Post and associated comments deleted');
    return response.redirect('back');
    }else{
        request.flash('error','You cannot delete this post');
        return response.redirect('back');
    }
   }catch(err){
    request.flash('error',err);
    return response.redirect('back');
   }

    
}