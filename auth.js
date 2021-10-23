const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');

const findOrCreate=require('mongoose-findorcreate');

passport.use(new GoogleStrategy({
    clientID: '60310748347-ea3aa5n5i0p3vf6pbrpdu531kndc3p00.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://bmscemw.herokuapp.com/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
    
//         console.log('ID: '+profile.id);
//       console.log('Name: '+profile.displayName);
//       console.log('Email : '+profile.emails[0].value);
//     User.findOrCreate({ googleId: profile.id,username:profile.emails[0].value}, function (err, user) {


//         return cb(err, user);
    
//       });
//     }
// ))

     User.findOne({googleId: profile.id}).then((currentUser)=>{
         if(currentUser){
           //if we already have a record with the given profile ID
           cb(null, currentUser);
         } else{
             // if not, create a new user 
             new User({
               username:profile.emails[0].value,googleId: profile.id,image: profile.photos[0].value,name:profile.displayName
             }).save().then((newUser) =>{
               cb(null, newUser);
             });
          } 
       })
     })
 );
  
 



passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})
