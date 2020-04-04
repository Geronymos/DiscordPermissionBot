import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Badge } from 'react-bootstrap';

function Channels({data, setActiveRole}) {
    function channelGetRoles(channels, channel) {
        const roleIDs = channel.permission_overwrites.map(overwrite => parseInt(overwrite.id));
        const roles = data.roles.filter(role => roleIDs.includes(role.id));
        return roles;
    }

    return (
    <Table>
        <thead>
            <tr>
            <th>Channel</th>
            <th>Roles</th>
            </tr>
        </thead>
        <tbody>
            {data.channels.map((channel, key) =>
            <tr key={key} >
                <td>{channel.name}</td>
                <td>{channelGetRoles(data.channels, channel).map( role => {
                const color = "#" + (role.color || 8948369).toString(16);
                // return <Button variant="outline-primary" className="mr-1" size="sm" style={{borderColor: color, color}}>{role.name}</Button>
                return <Badge onClick={() => setActiveRole(role)} key={role.id} className="mr-1" variant="primary" style={{ background: color }}>{role.name}</Badge>
                })
                }</td>
            </tr>
            )}
        </tbody>
    </Table>
    );
}

export default Channels;