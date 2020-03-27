const schema = require('../models/user')


let profileController={}

profileController.home = function(req, res) {
  res.render('index.ejs')
}

profileController.logIn = function(req, res) {
  res.render('login.ejs')
}

profileController.doLogin = function(req, res) {

}

profileController.goToRegister = function(req, res) {

}

profileController.doRegister = function(req, res) {
 res.render('register.ejs')
}

profileController.profile = function(req, res) {
  res.render('profile.ejs')
}

profileController.goToEdit = function(req, res) {
  res.render('edit-profile.ejs')
}

profileController.doEdit = function(req, res) {

}


module.exports = profileController
