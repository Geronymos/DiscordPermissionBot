<?php

$client_id = (getenv('CLIENT_ID') ? getenv('CLIENT_ID') : getenv('REDIRECT_CLIENT_ID'));
$url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]login.php";
$permission = 16;
$scope = "identify bot";

$link = "https://discordapp.com/api/oauth2/authorize?client_id=$client_id&permissions=$permission&redirect_uri=" . urlencode($url) . "&response_type=code&scope=" . urlencode($scope);

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <title>DiscordPermissionBot</title>
    <?php require "./.components/head.php" ?>
</head>

<body>
    <!-- NAV -->
    <?php require "./.components/navbar.php" ?>
    <!-- /NAV -->
    <header>
        <div class="jumbotron">
            <div class="container">
                <h1 class="display-4">DiscordPermissionBot</h1>
                <p class="lead">The DiscordPermissionBot makes it easy to edit large amounts of roles and channels of a guild in discord. </p>
                <hr class="my-4">
                <p>Implement the bot in your guild now and start managing your channels like a professional! </p>
                <a class="btn btn-primary btn-lg" href="<?php echo $link ?>" role="button">Add the bot</a>
            </div>
        </div>
    </header>
    <main>
        <div class="container mt-5">
            <div class="row mb-5">
                <div class="col-md-6">
                    <h2>Simplicity</h2>
                    <p>
                        Use the Discord API with a simple web interface. It comes with a formular for all the settings you want to change. Including the following components to handle your inputs:
                    </p>
                    <ul>
                        <li>Input elements</li>
                        <li>Selections</li>
                        <li>Permission calculator</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <img src="docs/v2020-04-17-select-a-role.png" class="rounded float-right w-100 h-auto" alt="">
                </div>
            </div>
            <hr>
            <div class="row mt-5">
                <div class="col-md-6">
                    <img src="docs/v2020-04-17-select-permissions.png" class="rounded float-right w-100 h-auto" alt="">
                </div>
                <div class="col-md-6">
                    <h2>Variation</h2>
                    <p>
                        The DiscordPermissionBot comes with different methods that make your life easier. Just decide on one and use as you wish. The bot comes with these methods:
                    </p>
                    <ul>
                        <li>Role-Channels</li>
                        <li>Similar name</li>
                        <li>Create from list</li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
    <?php require "./.components/footer.php" ?>
</body>

</html>