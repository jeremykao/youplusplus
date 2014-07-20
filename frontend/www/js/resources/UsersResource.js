//UsersResource.js

yppApp.factory('UsersResource', ['$resource', function($resource){
  return $resource('http://youplusplus.herokuapp.com/users/:uid', 
    {uid: '@uid'},
    {
      fetchUsers: {method: 'GET'},
      fetchUser: {method: 'GET'},
      createUser: {method: 'POST'},
      updateUser: {method: 'PUT'}
    });
}]);