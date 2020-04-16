
import React from 'react';
import { Badge } from 'react-bootstrap';

function Channel({ channel, roles, setActiveRole, setActiveChannel }) {

    // gets all roles that have a permission in the channel
    const channelRoles = roles.filter(({ id: roleID }) =>
        channel.permission_overwrites.some(({ id: overwriteID }) =>
            parseInt(overwriteID) === roleID
        )
    );

    return (
        <tr>
            <td>{channel.name}</td>
            <td>{channelRoles.map(channelRole => {
                const color = "#" + (channelRole.color || 8948369).toString(16);
                return <Badge onClick={() => { setActiveRole(channelRole); setActiveChannel(channel) }} key={channelRole.id} className="mr-1" variant="primary" style={{ background: color }}>{channelRole.name}</Badge>
            })
            }
            </td>
        </tr>
    );

}


export default Channel;