<?php

include __DIR__.'/vendor/autoload.php';

use RestCord\DiscordClient;

header('Content-Type: application/json');

// get bot token from evironment variable in htaccess file
$token = ( getenv('BOT_TOKEN') ? getenv('BOT_TOKEN') : getenv('REDIRECT_BOT_TOKEN') );
// get discord server id via get parameter; example: https://[...]/DiscordPermissionBot/?server=YOUR_SERVER_ID
$server = intval($_GET['server']);

// New bot client login
$discord = new DiscordClient(['token' => $token]); // Token is required

// get roles and channels from server
$roles = $discord->guild->getGuildRoles(['guild.id' => $server]);
$channels = $discord->guild->getGuildChannels(['guild.id' => $server]);

// bundle data
$data = [
    "channels" => $channels,
    "roles" => $roles
];

// print data
echo json_encode( $data, JSON_PRETTY_PRINT);

?>