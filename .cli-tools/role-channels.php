<?php

include('../vendor/autoload.php');

use RestCord\DiscordClient;

// for use in console (PHP cli)
if (isset($argc)) {
    $options = getopt("c:r:a:d:t:");
    $discord = new DiscordClient(['token' => $options['t']]); // Token is required

    role_channel(
        $discord,
        $options['c'], // channel
        $options['r'], // role
        $options['a'], // allow
        $options['d'] // deny
    );
}

function role_channel($client, $channelID, $roleID, $allow, $deny) {
    $parameters = [
        "channel.id" => intval($channelID),
        "overwrite.id" => strval($roleID),
        "allow" => intval($allow),
        "deny" => intval($deny),
        "type" => "role"
    ];
    $client->channel->editChannelPermissions($parameters);
}
