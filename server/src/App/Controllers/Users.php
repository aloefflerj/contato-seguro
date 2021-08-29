<?php

namespace Source\App\Controllers;

use Psr\Container\ContainerInterface as Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\RequestInterface as Request;
use Psr\Http\Message\ServerRequestInterface as ServerRequest;
use Source\App\Models\Users as ModelsUsers;
use Source\Core\JsonTraits;

class Users
{
    use JsonTraits;
    /**
     * container
     *
     * @var Container
     */
    protected $container;

    /**
     * users
     *
     * @var ModelsUsers
     */
    private $users;

    /**
     * construct
     *
     * @param Container $container 
     */
    public function __construct(Container $container)
    {
        /** @var Container $this->container  */
        $this->container = $container;

        /** @var ModelsUsers $this->users  */
        $this->users = new ModelsUsers();
    }

    public function get(Request $request, Response $response): Response
    {
        $users = $this->users->find()->fetch(true, true);
        $response->getBody()->write($users);

        return $response;
    }

    public function getUser(Request $request, Response $response, array $args): Response
    {
        //Validações ------------------------------------------------------------>
        $validate = $this->users->validateId($args['id']);
        if (!$validate) {
            $response->getBody()->write($this->users->fail()->getMessage());
            return $response;
        }

        $user = $this->users->userExists($args['id']);
        if (!$user) {
            $response->getBody()->write($this->users->fail()->getMessage());
            return $response;
        }

        //Resposta ------------------------------------------------------------>
        $response->getBody()->write($this->modelToJson($user));
        return $response;
    }

    public function newUser(ServerRequest $request, Response $response)
    {
        $body = $request->getParsedBody();
        $body = filter_var_array($body, FILTER_DEFAULT);

        $user = $this->users->register(
            $body['name'],
            $body['mail'],
            $body['phone'],
            $body['birth'],
            $body['city'],
        );

        //Validação ------------------------------------------------------------>
        if (!$this->users->save()) {
            $response->getBody()->write($this->users->fail()->getMessage());
            return $response;
        }

        //Resposta ------------------------------------------------------------>
        $response->getBody()->write($user->fetchJson());
        return $response;
    }

    public function deleteUser(Request $request, Response $response, array $args): Response
    {

        //Validação ------------------------------------------------------------>
        if (!$this->users->unregister($args['id'])) {
            $response->getBody()->write($this->users->fail()->getMessage());
            return $response;
        }

        //Resposta ------------------------------------------------------------>
        $users = $this->users->find()->fetch(true, true);
        $response->getBody()->write($users);
        return $response;
    }

    public function updateUser(ServerRequest $request, Response $response, array $args): Response
    {
        //Pegando dados do corpo da requisição ------------------------------------->
        $body = json_decode(file_get_contents('php://input'), true);
        $body = $request->withParsedBody($body)->getParsedBody();

        //Validações ------------------------------------------------------------>
        $user = $this->users->updateRegister($args['id'], $body['name'], $body['mail'], $body['phone'], $body['birth'], $body['city']);
        if (!$user) {
            $response->getBody()->write($this->users->fail()->getMessage());
            return $response;
        }

        if (!$user->save()) {
            $response->getBody()->write($user->fail()->getMessage());
            return $response;
        }

        //Resposta ------------------------------------------------------------>
        $response->getBody()->write($this->modelToJson($user));
        return $response;
    }
}
