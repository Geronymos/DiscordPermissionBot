<?php

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="assets/bootstrap-4.4.1-dist/css/bootstrap.css">
    <link rel="stylesheet" href="assets/style.css">
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
                <a class="btn btn-primary btn-lg" href="#" role="button">Add the bot</a>
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
    <footer>
        <hr>
        <div class="container p-4">
            - Made with love by Gero Beckmann (aka Geronymos, Orangerot)
        </div>
    </footer>
</body>

</html>