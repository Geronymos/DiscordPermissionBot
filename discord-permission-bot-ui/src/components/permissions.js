import React from 'react';
import { Table } from 'react-bootstrap';

// use like flags[0].name
import flags from '../permission_codes.json';

function Permsissions({ activeRole }) {
    console.log( "activeRole", activeRole );

    function getChannelRolePermission(flagList, permission_overwrites) {
        return flagList.map(({ code, name, description }) => ({
            name,
            code,
            description,
            allow: permission_overwrites.allow & parseInt(code) === parseInt(code),
            deny: permission_overwrites.deny & parseInt(code) === parseInt(code)
        }));
    }
    
    if (!activeRole) return "";

    return (
        <>
            <h2>Role: {activeRole.role.name}</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Permsission</th>
                        <th>Allow</th>
                        <th>Deny</th>
                    </tr>
                </thead>
                <tbody>
                    {getChannelRolePermission(flags, activeRole.permission_overwrites).map(flag => (
                        <tr>
                            <td>{flag.name}</td>
                            <td>{flag.allow ? "True" : "False"}</td>
                            <td>{flag.deny ? "True" : "False"}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Permsissions;