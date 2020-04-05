
import React from 'react';
import { Badge } from 'react-bootstrap';

function Channel({ channel, roles, setActiveRole }) {

    function channelGetRoles(channel, roles) {
        // get role IDs and role permissions from channel 
        const permission_overwrites = channel.permission_overwrites;
        // only get IDs from permission overwrites
        const overwriteIDs = permission_overwrites.map(role => parseInt(role.id));

        // only get roles which have the same id as in the permission overwrite
        const channelRoles = roles.filter(role => overwriteIDs.includes(role.id));

        const data = channelRoles.map(role => ({
            channel,
            role,
            permission_overwrites: permission_overwrites.find(permission_overwrite => parseInt(permission_overwrite.id) === role.id)
        }));
        // console.log(data);
        return data;
    }

    return (
        <tr>
            <td>{channel.name}</td>
            <td>{channelGetRoles(channel, roles).map(channelRole => {
                const color = "#" + (channelRole.role.color || 8948369).toString(16);
                return <Badge onClick={() => setActiveRole(channelRole)} key={channelRole.role.id} className="mr-1" variant="primary" style={{ background: color }}>{channelRole.role.name}</Badge>
            })
            }
            </td>
        </tr>
    );

}


export default Channel;