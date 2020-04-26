<?php
$json = file_get_contents("assets/permission_codes.json");
$permissions = json_decode($json);
$general_permissions = [];
$text_permissions = [];
$voice_permissions = [];

foreach ($permissions as $permission) {
    if (strpos($permission->type, "T") !== False) {
        array_push($text_permissions, $permission);
    }
    if (strpos($permission->type, "V") !== False) {
        array_push($voice_permissions, $permission);
    }
    if ($permission->type === "") {
        array_push($general_permissions, $permission);
    }
}

function PermissionComponent($permission)
{
    $component = "
    <tr>
        <td>
            <span class=\"d-inline-block\">
                $permission->name
            </span>
        </td>
        <td class=\"text-right\">
            <div class=\"btn-group btn-group-toggle btn-group-sm\" data-toggle=\"buttons\">
                <label class=\"btn btn-secondary\">
                    <input name=\"$permission->code\" type=\"radio\" value=\"deny\">❌
                </label>
                <label class=\"btn btn-secondary active \">
                    <input name=\"$permission->code\" type=\"radio\" value=\"default\" checked>➖
                </label>
                <label class=\"btn btn-secondary\">
                    <input name=\"$permission->code\" type=\"radio\" value=\"allow\">✔
                </label>
            </div>
        </td>
    </tr>
    ";
    echo $component;
}

// echo $permissions[0]->name;
?>

<div class="form-row">
    <div class="form-group col">
        <label class="form-label" for="formGridAllow">Allow bitset</label>
        <input placeholder="Not required" id="allow" name="allow" class="form-control" value="0">
    </div>
    <div class="form-group col">
        <label class="form-label" for="formGridDeny">Deny bitset</label>
        <input placeholder="Not repuired" id="deny" name="deny" class="form-control" value="0">
    </div>
</div>

<div class="row">
    <div class="col-lg-4">
        <table class="table">
            <thead>
                <th>General Permissions</th>
                <th></th>
            </thead>
            <tbody>
                <?php foreach ($general_permissions as $permission) PermissionComponent($permission) ?>
            </tbody>
        </table>
    </div>
    <div class="col-lg-4">
        <table class="table">
            <thead>
                <th>Text Permissions</th>
                <th></th>
            </thead>
            <tbody>
                <?php foreach ($text_permissions as $permission) PermissionComponent($permission) ?>
            </tbody>
        </table>
    </div>
    <div class="col-lg-4">
        <table class="table">
            <thead>
                <th>Voice Permissions</th>
                <th></th>
            </thead>
            <tbody>
                <?php foreach ($voice_permissions as $permission) PermissionComponent($permission) ?>
            </tbody>
        </table>
    </div>
</div>

<script defer>
    const permissions = <?php echo $json ?>;
    const general_permissions = <?php echo json_encode($general_permissions) ?>;
    const text_permissions = <?php echo json_encode($text_permissions) ?>;
    const voice_permissions = <?php echo json_encode($voice_permissions) ?>;

    const allowInput = document.getElementById('allow');
    const denyInput = document.getElementById('deny');

    function decodePermission(allow, deny) {

        // sets permission state of every btn-group if the permission is in the bitSet
        permissions.map(permission => {
            if ((parseInt(allow) & parseInt(permission.code)) === parseInt(permission.code)) {
                $(`[name=${permission.code}][value=allow]`).parent().button('toggle');
            } else if ((parseInt(deny) & parseInt(permission.code)) === parseInt(permission.code)) {
                $(`[name=${permission.code}][value=deny]`).parent().button('toggle');
            } else {
                $(`[name=${permission.code}][value=default]`).parent().button('toggle');
            }

            allowInput.value = allow;
            denyInput.value = deny;
        });
    }

    // this.focus fixes the button('toggle') focus
    allowInput.oninput = function() {
        decodePermission(allowInput.value, denyInput.value);
        $(this).focus()
    };
    denyInput.oninput = function() {
        decodePermission(allowInput.value, denyInput.value);
        $(this).focus()
    };

    // encode permission
    permissions.map(permission => {
        const elements = [...document.getElementsByName(permission.code.toString())];

        // for each btn-group set the bitSet according to the state
        elements.map(element => {
            element.onclick = function() {
                const code = parseInt(permission.code);
                switch (element.value) {
                    case "allow":
                        allowInput.value |= code;
                        denyInput.value &= ~code;
                        break;
                    case "deny":
                        denyInput.value |= code;
                        allowInput.value &= ~code;
                        break;
                    default:
                        allowInput.value &= ~code;
                        denyInput.value &= ~code;
                }
                // to keep radio button across permission types (general, text, voice) consistent
                decodePermission(allowInput.value, denyInput.value);
            };
        });
    });
</script>