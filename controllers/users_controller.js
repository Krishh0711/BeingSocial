const User =  require('../models/user');

module.exports.profile = function(request,response){
   if(request.cookies.user_id){
      User.findById(request.cookies.user_id,function(err,user){
         if(user){
            return response.render('user_profile',{
               title: "User Profile",
               user: user
            })
         }else{
            return response.redirect('/users/sign-in');
         }
      })
   }else{
      return response.redirect('/users/sign-in');
   }
}

//render the sign up page
module.exports.signUp = function(request,response){
   return response.render('user_sign_up',{
      title:"BeingSocial | Sign Up"
   });
}

//render the sign in page
module.exports.signIn = function(request,response){
   return response.render('user_sign_in',{
      title:"BeingSocial | Sign In"
   });
}

//get the sign up data
module.exports.create = function(request,response){
  if(request.body.password !=  request.body.confirm_password){
     return response.redirect('back');
  }

  User.findOne({email: request.body.email},function(err,user){
     if(err){console.log('error in finding user in signing up'); return}

     if(!user){
        User.create(request.body, function(err,user){
         if(err){console.log('error in creating user in signing up'); return} 

         return response.redirect('/users/sign-in');
        });
     }else{
      return response.redirect('back');
     }
  })
}

//sign in and create session for user   
module.exports.createSession = function(request,response){
   //steps to authenticate

   //find the user 
   User.findOne({email: request.body.email}, function(err, user){
      if(err){console.log('error in finding user in signing in'); return}  
       //handle user found
      if(user){
       //hand password which don't match
       if(user.password != request.body.password){
         return response.redirect('back');
       }
       //handle session creation
       response.cookie('user_id',user.id);
       return response.redirect('/users/profile');

      }else{
         //handle user not found
         return response.redirect('back');
      }
   });
   
}

module.exports.signOut = function(request,response){
   if(request.cookies.user_id){
      response.clearCookie('user_id');
      return response.redirect('/users/sign-in');
   }else{
      return response.redirect('/users/sign-in');
   }
}