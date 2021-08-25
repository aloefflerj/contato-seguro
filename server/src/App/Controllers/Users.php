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
        //Valida inteiro
        $id = filter_var($args['id'], FILTER_VALIDATE_INT);
        if (!$id) {
            $response->getBody()->write(json_encode([
                'message' => [
                    'content' => 'Não é um valor inteiro válido',
                    'type' => 'error'
                ]
            ]));
            return $response;
        }

        $user = $this->users->findById($id);
        if (!$user) {
            $response->getBody()->write(json_encode([
                'message' => [
                    'content' => 'Usuário não encontrado',
                    'type' => 'error'
                ]
            ]));
            return $response;
        }

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
        if (!$this->users->save()) {
            $response->getBody()->write(
                json_encode([
                    'message' => [
                        'content' => $this->users->fail()->getMessage(),
                        'type' => 'error'
                    ]
                ])
            );
            return $response;
        }

        $response->getBody()->write($user->fetchJson());
        return $response;
    }

    public function deleteUser(Request $request, Response $response, array $args): Response
    {
        $id = filter_var($args['id'], FILTER_VALIDATE_INT);
        if (!$id) {
            $response->getBody()->write(json_encode([
                'message' => [
                    'content' => 'Não é um valor inteiro válido',
                    'type' => 'error'
                ]
            ]));
            return $response;
        }

        $user = $this->users->findById($id);
        if (!$user) {
            $response->getBody()->write(json_encode([
                'message' => [
                    'content' => 'Usuário não encontrado',
                    'type' => 'error'
                ]
            ]));
            return $response;
        }

        $user->destroy();

        $users = $this->users->find()->fetch(true, true);
        $response->getBody()->write($users);
        return $response;
    }

    public function updateUser(ServerRequest $request, Response $response, array $args): Response
    {
        $id = filter_var($args['id'], FILTER_VALIDATE_INT);
        if (!$id) {
            $response->getBody()->write(json_encode([
                'message' => [
                    'content' => 'Não é um valor inteiro válido',
                    'type' => 'error'
                    ]
                ]));
                return $response;
            }
            
            $user = $this->users->findById($id);
            if (!$user) {
                $response->getBody()->write(json_encode([
                    'message' => [
                        'content' => 'Usuário não encontrado',
                        'type' => 'error'
                        ]
                    ]));
                    return $response;
                }

        $body = filter_var_array($request->getParsedBody(), FILTER_DEFAULT);
                
        if(empty($body['name']) && empty($body['mail'])){
            $response->getBody()->write(json_encode([
                'message' => [
                    'content' => 'Por favor, preencha todos os campos obrigatórios',
                    'type' => 'alert'
                ]
            ]));
            return $response;
        }

        $user->name     = $body['name'];
        $user->mail     = $body['mail'];
        $user->phone    = $body['phone'] ?? null;
        $user->birth    = $body['birth'] ?? null;
        $user->city     = $body['city'] ?? null;
        $user->save();
        if(!$user->save()) {
            $response->getBody()->write(json_encode([
                'message' => [
                    'content' => $user->fail()->getMessage(),
                    'type' => 'error'
                ]
            ]));
            return $response;
        }
        

        $response->getBody()->write($this->modelToJson($user));
        return $response;
    }

    // public function updateUserData(ServerRequest $request, Response $response): Response
    // {
    //     $response->getBody()->write(json_encode(["update user data"]));
    //     return $response;
    // }

    public function groupUsers(Request $request, Response $response, array $args): Response
    {
        $field = filter_var($args['field'], FILTER_SANITIZE_STRIPPED);

        $users = $this->users->find()->group($field)->fetch(true, true);

        $response->getBody()->write($users);
        return $response;
    }

    public function groupUsersBy(Request $request, Response $response): Response
    {
        $response->getBody()->write(json_encode(["group users by"]));
        return $response;
    }
    
}
