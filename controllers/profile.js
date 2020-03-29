const schema = require('../models/user')
const fetch = require("node-fetch");
const api_url = 'http://pebble-pickup.herokuapp.com/tweets'

let profileController = {}

profileController.home = function (req, res) {
  console.log(req.session)
  res.render('index.ejs')
}

profileController.logIn = function (req, res) {
  console.log(req.rateLimit)
  res.render('login.ejs')
}

profileController.doLogin = function (req, res) {
  res.redirect('profile')
}

profileController.goToRegister = function (req, res) {
  res.render('register.ejs')
}

profileController.doRegister = function (req, res) {
  res.render('register.ejs')
}

profileController.profile = function (req, res) {

  if (req.user) {
    res.render('profile.ejs')
  } else {
    res.redirect('login')
  }
}


profileController.goToEdit = function (req, res) {
  if (req.user) {
    res.render('edit-profile.ejs')
  } else {
    res.redirect('login')
  }
}

profileController.doEdit = function (req, res) {
    //if checkbox has been checked, connect to api to choose random pickupline
    let randomCheck = req.body.pickupBox
    let name = req.body.name
    console.log(req.body.pickupBox)

    if(randomCheck){
    //make connection with API
    fetch(api_url)
      .then(function (response) {
        // console.log(response)
        return response.json()
      })
      .then(function (json) {
        //taking the list of json pickuplines and putting them in a variable
        let pickupLines = json
        //here I choose which pickupline I want to use. the list consists out of an array so I picked an object within that array
        //TODO add random picker for array
        //console.log(pickupLines.length)
        let myLine = pickupLines[4]
        //here I take the key value from the object. tweet is the pickupline from that object
        let temp = myLine.tweet
        console.log('pickupline is ', temp)

        schema.findOneAndUpdate({
          _id: req.user.id
        }, {
          $set: {
            pickupline: temp,
            name: name
          }
        }, {
          useFineAndModify: false
        }, function (err) {
          if (err) {
            console.log('something went wrong when i tried to update: ', err)
          } else {
            console.log('account has been updated')
          }
        })
        res.render('profile.ejs', {
          pickupLine: temp
        })
        return temp
      })
      .catch(function (err) {
        if (err) {
          console.log(err)
        }
      })
  }
    else{
      console.log('checkbox not ticked')
      let sentence = req.body.pickupText
      schema.findOneAndUpdate({
        _id: req.user.id
      }, {
        $set: {
          pickupline: sentence,
          name: name
        }
      }, {
        useFineAndModify: false
      }, function (err) {
        if (err) {
          console.log('something went wrong when i tried to update: ', err)
        } else {
          console.log('account has been updated without checkbox tick')
          res.render('profile')
        }
      })
    }

}




module.exports = profileController
