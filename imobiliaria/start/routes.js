"use strict";

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
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("/login", "PessoaController.login");
Route.post("/signup", "PessoaController.signup");

Route.group(() => {
  Route.put("/profile", "PessoaController.me");
  Route.get("/users", "PessoaController.index");
  Route.put("/users/:cpf", "PessoaController.show");
  Route.delete("/profile/remove", "PessoaController.remover");
}).middleware(["auth:jwt"]);

Route.group(() => {
  Route.post("/imoveis/create", "ImovelController.create");
}).middleware(["auth:jwt"]);

Route.group(() => {
  Route.get("/cargos", "CargoController.index");
  Route.get("/cargos/:id", "CargoController.show");
  Route.post("/cargos/create", "CargoController.create");
  Route.put("/cargos/update/:id", "CargoController.update");
  Route.delete("/cargos/delete/:id", "CargoController.destroy");
}).middleware(["auth:jwt"]);

Route.group(() => {
  Route.get("/pagamentos", "PagamentoController.index");
  Route.get("/pagamentos/:id", "PagamentoController.show");
  Route.post("/pagamentos/create", "PagamentoController.create");
  Route.put("/pagamentos/update/:id", "PagamentoController.update");
  Route.delete("/pagamentos/delete/:id", "PagamentoController.destroy");
}).middleware(["auth:jwt"]);

Route.get("/imoveis/index", "ImovelController.index");
