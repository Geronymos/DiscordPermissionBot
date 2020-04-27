<?php
include './vendor/autoload.php';

use RestCord\DiscordClient;

session_start();
if (empty($_SESSION)) {
    die("Not logged in!");
}

// get bot token from evironment variable in htaccess file
$token = (getenv('BOT_TOKEN') ? getenv('BOT_TOKEN') : getenv('REDIRECT_BOT_TOKEN'));

$guild_id = intval($_SESSION['guild_id']);

$message = "All fine!";

// New bot client login
$discord = new DiscordClient(['token' => $token]); // Token is required

// get roles and channels from guild
$roles = $discord->guild->getGuildRoles(['guild.id' => $guild_id]);
$channels = $discord->guild->getGuildChannels(['guild.id' => $guild_id]);

if (!empty($_POST)) {

    foreach ($_POST['channels'] as $channel) {
        $parameters = [
            "channel.id" => intval($channel),
            "overwrite.id" => strval($_POST['role']),
            "allow" => intval($_POST['allow']),
            "deny" => intval($_POST['deny']),
            "type" => "role"
        ];
        $discord->channel->editChannelPermissions($parameters);
    }

    $rolename = $roles[array_search(intval($_POST['role']), array_column($roles, 'id'))]->name;
    $channelnames = [];
    foreach ($_POST['channels'] as $channel) {
        array_push($channelnames, $channels[array_search(intval($channel), array_column($channels, 'id'))]->name);
    }
    $message = "Operation Made. Hopefully changed $rolename in channels " . join(", ", $channelnames) . ". ";
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>Role-Channels</title>
    <?php require "./.components/head.php" ?>
</head>

<body>
    <?php require "./.components/navbar.php" ?>
    <main>
        <div class="container">
            <h2>Role-Channels</h2>
            <p>Change the permision of one role for multiple channels. </p>
            <form method="post">
                <div class="row">
                    <div class="col-md-3 order-md-2">
                        <div class="form-group">
                            <label class="form-label" for="channels">Channels</label>
                            <select name="channels[]" multiple="" required id="channels" class="custom-select" size="10">
                                <?php
                                foreach ($channels as $channel) {
                                    echo "<option value=" . $channel->id . ">" . ($channel->type === 0 ? "<b>#</b>" : "<b>🔊</b>") . $channel->name . "</option>";
                                }
                                ?>
                            </select>
                        </div>


                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    <div class="col-md-9">
                        <div class="form-group">
                            <label class="form-label" for="role">Role</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">@</div>
                                </div>
                                <select id="role" name="role" class="form-control">
                                    <?php
                                    foreach ($roles as $role) {
                                        echo "<option value=" . $role->id . ">" . $role->name . "</option>";
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>

                        <hr>

                        <?php require "./.components/permissions.php" ?>

                    </div>
                </div>
            </form>
        </div>
    </main>
    <?php require "./.components/footer.php" ?>
</body>

</html>