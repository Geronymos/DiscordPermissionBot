<?php

include('../vendor/autoload.php');

use RestCord\DiscordClient;

// for use in console (PHP cli)
if (isset($argc)) {
    $options = getopt("g:a:d:t:");
    $discord = new DiscordClient(['token' => $options['t']]); // Token is required

    similar_name(
        $discord,
        $options['g'], // guild
        $options['a'], // allow
        $options['d'] // deny
    );
}

function similar_name($client, $guildID, $allow, $deny) {
    $roles = $client->guild->getGuildRoles(['guild.id' => intval($guildID)]);
    $channels = $client->guild->getGuildChannels(['guild.id' => intval($guildID)]);

    $pairs = [];

    foreach ($roles as $role) {
        foreach ($channels as $channel) {
            $minifiedRoleName = preg_replace('/\W/', "", strtolower($role->name));
            $minifiedChannelName = preg_replace('/\W/', "", strtolower($channel->name));

            if ( $minifiedRoleName === $minifiedChannelName ) {
                array_push($pairs, [
                    "role" => $role,
                    "channel" => $channel
                ]);
            }
        }
    }

    foreach ( $pairs as $pair ) {
        echo $pair["role"]->name . " in " . $pair["channel"]->name . "\n";
        $parameters = [
            "channel.id" => $pair["channel"]->id,
            "overwrite.id" => strval($pair["role"]->id),
            "allow" => intval($allow),
            "deny" => intval($deny),
            "type" => "role"
        ];
        $client->channel->editChannelPermissions($parameters);
    }
}