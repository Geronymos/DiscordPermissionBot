<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php

    include __DIR__.'/vendor/autoload.php';

    use RestCord\DiscordClient;

    $token = getenv('BOT_TOKEN');

    // $discord = new DiscordClient(['token' => 'bot-token']); // Token is required



    // var_dump($discord->guild->getGuild(['guild.id' => 81384788765712384]));
    echo "Hello Wolrd!";
    echo $token; 
    ?>
    
</body>
</html>