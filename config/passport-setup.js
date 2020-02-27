const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const keys = require('./keys');
const User = require('../models/user-model'); 


passport.serializeUser((user,done)=> {
    done(null,user.id)
});

passport.deserializeUser((id,done)=> {
    User.findById(id).then((user)=>{
        done(null,user);
    })
    
});



passport.use( new TwitterStrategy({
    //options for twitter strategy
    callbackURL: '/auth/twitter/redirect',
    consumerKey: keys.twitter.clientID,
    consumerSecret: keys.twitter.clientSecret    
   },(accessToken,refreshToken,profile,done ) => {
       //check if user already exists in our DB
       User.findOne({sourceId:profile.id}).then((currentUser)=>{
           if(currentUser){
               //already have the user
               //console.log(profile);
               //console.log('current user'+currentUser);
               done(null,currentUser);
           } else {
               console.log(profile);
               //create new user in the DB
               new User({
                username:profile.displayName,
                sourceId:profile.id,
                thumbnail:profile._json.profile_image_url,
                source:'twitter'
              
            }).save().then((newUser)=>{
                console.log('new user created:'+newUser);
                done(null,newUser);
            })
           }

       })
    
   
    
})
); 