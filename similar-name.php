<?php

include_once(__DIR__ . './vendor/autoload.php');
include_once(__DIR__ . './.cli-tools/similarName.php');

use RestCord\DiscordClient;

session_start();
if (empty($_SESSION)) {
    die("Not logged in!");
}

// get bot token from evironment variable in htaccess file
$token = (getenv('BOT_TOKEN') ? getenv('BOT_TOKEN') : getenv('REDIRECT_BOT_TOKEN'));

// New bot client login
$discord = new DiscordClient(['token' => $token]); // Token is required

$guild_id = intval($_SESSION["guild_id"]);

if (!empty($_POST)) {
    similar_name($discord, $guild_id, $_POST["allow"], $_POST["deny"]);
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Similar name</title>
    <?php require "./.components/head.php" ?>
</head>

<body>
    <?php require "./.components/navbar.php" ?>
    <main>
        <div class="container">
            <h2>Similar name</h2>
            <p>Sets the permissions of roles in channels with a similar name. </p>
            <form method="post">
                <div class="form-group">
                    <?php require "./.components/permissions.php" ?>
                </div>
                <button class="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    </main>
    <?php require "./.components/footer.php" ?>
</body>

</html>