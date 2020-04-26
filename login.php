<?php

session_start();

function getToken($client_id, $client_secret, $code, $redirect_url, $scope)
{
    $content = [
        "client_id" => $client_id,
        "client_secret" => $client_secret,
        "grant_type" => "authorization_code",
        "code" => $code,
        "redirect_uri" => $redirect_url,
        "scope" => $scope
    ];

    $header = [
        "http" => [
            "method" => "POST",
            "header" => "Content-Type: application/x-www-form-urlencoded",
            "content" => http_build_query($content)
        ]
    ];
    $request = file_get_contents("https://discordapp.com/api/v6/oauth2/token", false, stream_context_create($header));
    $json = json_decode($request);

    return $json;
}

function getUser($token)
{
    $header = [
        "http" => [
            "method" => "GET",
            "header" => "Authorization: Bearer $token",
        ]
    ];
    $user = file_get_contents("https://discordapp.com/api/users/@me", false, stream_context_create($header));

    $json = json_decode($user);

    return $json;
}

if (isset($_GET["code"]) && isset($_GET["guild_id"])) {

    $client_secret = (getenv('CLIENT_SECRET') ? getenv('CLIENT_SECRET') : getenv('REDIRECT_CLIENT_SECRET'));
    $client_id = (getenv('CLIENT_ID') ? getenv('CLIENT_ID') : getenv('REDIRECT_CLIENT_ID'));

    $url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]" . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    echo $url;
    $url = "http://localhost/DiscordPermissionBot/login.php";
    $permission = 16;
    $scope = "identify bot";
    $access_token = getToken($client_id, $client_secret, $_GET["code"], $url, $scope);
    $user = getUser($access_token->access_token);

    $_SESSION["user"] = $user;
    $_SESSION["access_token"] = $access_token;
    $_SESSION["guild_id"] = $_GET["guild_id"];

    // var_dump($user);

    // var_dump($_SESSION);

    header("Location: ./dashboard.php");
} else {
    die("No OAuth code given!");
}
