const User =  require('../models/user');

module.exports.profile = async function(request,response){
    
   try {
      let user = await User.findById(request.params.id);
      return response.render('user_profile',{
         title: "BeingSocial/Profile",
         profile_user:user
      });
   } catch (error) {
      console.log('Error --->' , error);
      return;
   }

  
}

module.exports.update = async function(request,response){
 
  try {
    if(request.user.id == request.params.id){
      let user = await User.findByIdAndUpdate(request.params.id, request.body);
      return response.redirect('back');
    }else{
      return response.status(401,send('Unauthorised'));
    }
  } catch (error) {
    console.log('Error --->' , error);
    return;
  }
  
}

//render the sign up page
module.exports.signUp = function(request,response){
   if(request.isAuthenticated()){
      response.redirect('/users/profile');
   }
   return response.render('user_sign_up',{
      title:"BeingSocial | Sign Up"
   });
}

//render the sign in page
module.exports.signIn = function(request,response){
   if(request.isAuthenticated()){
     return response.redirect('/users/profile');
   }
   return response.render('user_sign_in',{
      title:"BeingSocial | Sign In"
   });
}

//get the sign up data
module.exports.create = async function(request,response){
  try {
   if(request.body.password !=  request.body.confirm_password){
      return response.redirect('back');
   }
 
   let user = await User.findOne({email: request.body.email});
   
   if(!user){
    let userInsert = await User.create(request.body);
    return response.redirect('/users/sign-in');
    }else{
    return response.redirect('back');
    }
     
  } catch (error) {
    console.log('Error --->' , error);
    return;
  }
}

//sign in and create session for user   
module.exports.createSession = function(request,response){
   request.flash('success', 'Logged in Successfully');
   return response.redirect('/');
}

module.exports.destroySession = function(request,response){
   request.logout();
   request.flash('success', 'Logged out Successfully');
   return response.redirect('/');
}