<?php 
    session_start();
    if (empty($_SESSION)) {
        die("Not logged in!");
    }
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
                <h1 class="display-4">Hello <?php echo $_SESSION["user"]->username ?>  <img src="<?php echo "https://cdn.discordapp.com/avatars/" . $_SESSION["user"]->id . "/". $_SESSION["user"]->avatar. ".png?size=128" ?>" class="rounded" alt="Cinque Terre"> </h1>
                <p class="lead">Now you can select one of three methods of managing your channels. </p>
                <hr class="my-4">
                <p>Of cause you can come back to this page and do more changes if you want! </p>
            </div>
        </div>
    </header>
    <main>
        <div class="container mt-5">

            <div class="card-deck">
                <div class="card">
                    <img src="docs/v2020-04-17-select-a-role.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Role-Channels</h5>
                        <p class="card-text">Change the permision of one role for multiple channels. </p>
                        <a href="#" class="btn btn-secondary stretched-link">Use this method</a>
                    </div>
                </div>
                <div class="card">
                    <img src="docs/v2020-04-17-select-channels.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Similar name</h5>
                        <p class="card-text">Sets the permission of roles in channels with a similar name. </p>
                        <a href="#" class="btn btn-secondary stretched-link">Use this method</a>
                    </div>
                </div>
                <div class="card">
                    <img src="docs/v2020-04-17-select-permissions.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Create from list</h5>
                        <p class="card-text">Creates roles, voice and text channels titled after a given role of names. </p>
                        <a href="#" class="btn btn-secondary stretched-link">Use this method</a>
                    </div>
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