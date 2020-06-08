const passport =  require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
  usernameField: 'email'
},
function(email,password,done){
   //find a user and establish the identity
   User.findOne({email:email},function(err,user){
      if(err){
          console.log('Error in finding user ---> Passport');
          return done(err);
      }
      if(!user || user.password!=password){
         console.log('Invalid username password');
          return done(null,false);
      }

      return done(null,user);
   });
}
));

//serialize the user to decide which key is to be kept in cookie
passport.serializeUser(function(user,done){
  done(null,user.id);
});

//deserialize the user from the key in the cokkies
passport.deserializeUser(function(id,done){
  User.findById(id, function(err, user){
    if(err){
        console.log('Error in finding user ---> Passport'); 
        return done(err);
    }
    return done(null,user);

  });
});

//check if user is autheticated
passport.checkAuthentication = function(request,response,next){
    //if user is signed in , then pass  on the request to the next function(controllers's action)
    if(request.isAuthenticated()){
        return next();
    }

    //if user is not signed in
    return response.redirect('/users/sign-in');
}

passport.setAuthenticatedUser =  function(request,response,next){
    if(request.isAuthenticated()){
        //request.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        response.locals.user = request.user;
    }
    next();
}


module.exports = passport;
