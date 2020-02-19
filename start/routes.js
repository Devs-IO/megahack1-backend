'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { message: 'TÁ FUNCIONANDO UHULLLLLLLLL' }
})

// routes without auth
// users
Route.post('/users', 'UserController.store')
// sessions
Route.post('/sessions', 'SessionController.store')

Route.group(() => {
  // users
  Route.get('/users', 'UserController.index')
  Route.get('/users/:id', 'UserController.index')
  // wallets
  Route.get('/wallets', 'WalletController.index')
  // bankslips
  Route.get('/bankslips', 'BankslipController.index')
  Route.get('/bankslips/:id', 'BankslipController.index')
  Route.post('/bankslips', 'BankslipController.store')
  // categories
  Route.get('/categories', 'CategoryController.index')
  Route.get('/categories/:id', 'CategoryController.index')
  Route.post('/categories', 'CategoryController.store')
}).middleware(['auth'])
