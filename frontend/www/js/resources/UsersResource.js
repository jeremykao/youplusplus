//UsersResource.js

yppApp.factory('UsersResource', ['$resource', function($resource){
  return $resource('http://0.0.0.0:1234/users/:uid', 
    {uid: '@uid'},
    {
      fetchUsers: {method: 'GET'},
      fetchUser: {method: 'GET'},
      createUser: {method: 'POST'},
      updateUser: {method: 'PUT'}
    });
}]);