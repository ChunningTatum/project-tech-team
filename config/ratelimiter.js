const rateLimit = require("express-rate-limit")
// app.set('trust proxy', 1) Use this when you are going to deploy it on Heroku


let bruteforceCheck={}

bruteforceCheck.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message:"you entered the wrong credentials a lot of times, now you will have to wait 15 minutes unfortunately"

} ,console.log('SANITY CHECK FOR RATE LIMITER PLS DO IT'))


module.exports = bruteforceCheck
