const UserController = require('./user.controller')
const AuthValidation = require('../Auth/auth.validations')

exports.routesConfig = function(app){
    app.post('/users/create', [UserController.createUser])
    app.get('/users/:userId', [AuthValidation.jwtValid,UserController.getById])
    app.put('/users/:userId/deleteUser', [AuthValidation.jwtValid,UserController.deleteUser])
    app.put('/users/:userId/updatePassword', [AuthValidation.jwtValid, UserController.deleteUser])
}
