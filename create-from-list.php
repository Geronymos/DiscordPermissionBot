<?php

include './vendor/autoload.php';

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
    $list = explode("\n", $_POST["list"]);
    foreach ($_POST['type'] as $type) {
        switch($type) {
            case "role":
                foreach ($list as $item) {
                    $discord->guild->createGuildRole(["guild.id" => $guild_id, "name" => $item]);
                }
            break;
            case "text":
                foreach ($list as $item) {
                    $discord->guild->createGuildChannel(["guild.id" => $guild_id, "name" => $item, "type" => 0]);
                }
            break;
            case "voice":
                foreach ($list as $item) {
                    $discord->guild->createGuildChannel(["guild.id" => $guild_id, "name" => $item, "type" => 2]);
                }
                break;
            default:
                die("No type given!");
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Create from list</title>
    <?php require "./.components/head.php" ?>
</head>

<body>
    <?php require "./.components/navbar.php" ?>
    <main>
        <div class="container">
            <h2>Create from list</h2>
            <p>Creates roles, voice and text channels titled after a given role of names. </p>
            <form method="post">
                <div class="form-group">
                    <div class="btn-group btn-group-toggle btn-group-sm w-100" data-toggle="buttons">
                        <label class="btn btn-primary">
                            <input name="type[]" type="checkbox" value="role">Role
                        </label>
                        <label class="btn btn-primary active">
                            <input name="type[]" type="checkbox" value="text" checked>#Text
                        </label>
                        <label class="btn btn-primary">
                            <input name="type[]" type="checkbox" value="voice">Voice
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <textarea class="form-control" name="list" required></textarea>
                </div>
                <button class="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    </main>
    <?php require "./.components/footer.php" ?>
</body>

</html>