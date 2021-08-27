<?php

namespace Source\App\Middlewares;

use Slim\Psr7\Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;


class RestApi
{
    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $response = $handler->handle($request);
        $existingContent = (string) $response->getBody();

        $response = new Response();
        $response->getBody()->write($existingContent);
        // header("Content-Type: application/json", true);
        // return $response->withHeader("Access-Control-Allow-Origin", "*");
        return $response->withAddedHeader("Content-Type", "application/json");
    }
}
