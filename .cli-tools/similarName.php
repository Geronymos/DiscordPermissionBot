<?php

include_once(__DIR__ . '/../vendor/autoload.php');
include_once(__DIR__ . '/role-channel.php');

use RestCord\DiscordClient;

// for use in console (PHP cli)
if (get_included_files()[0] == __FILE__ && isset($argc)) {
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
        role_channel($client, $pair['channel']->id, $pair['role']->id, $allow, $deny);
    }
}