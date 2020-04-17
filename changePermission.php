<?php
include './vendor/autoload.php';
// include './.cli-tools/role-channel.php';

use RestCord\DiscordClient;

header('Content-Type: application/json;');
header("Access-Control-Allow-Origin: *");

// get bot token from evironment variable in htaccess file
$token = ( getenv('BOT_TOKEN') ? getenv('BOT_TOKEN') : getenv('REDIRECT_BOT_TOKEN') );

// New bot client login
$discord = new DiscordClient(['token' => $token]); // Token is required

if(isset($_POST)) {
$raw_post = file_get_contents("php://input");
$data = json_decode($raw_post);
// var_dump($data->role);

$parameters = [
    "channel.id" => intval($data->channel),
    "overwrite.id" => strval($data->role),
    "allow" => intval($data->overwrites->allow),
    "deny" => intval($data->overwrites->deny),
    "type" => "role"
];

// $parameters = [
//     "channel.id" => intval(306153733497028611),
//     "overwrite.id" => strval(696671361304887316),
//     "allow" => intval(0),
//     "deny" => intval(-1),
//     "type" => "role"
// ];
$discord->channel->editChannelPermissions($parameters);
}

?>