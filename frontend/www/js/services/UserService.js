//UserService.js

yppApp.service('UserService', function(){
  var self = this;
  this.user = {
    uid: 0,
    fname: "",
    lname: "",
    challenges: []
  };
  this.getUid = function(){
    return self.user.uid;
  };
  this.fullName = function(){
    return self.user.fname + " " + self.user.lname;
  };
  this.save = function(userData){
    _.extend(this.user, userData);
  }
});