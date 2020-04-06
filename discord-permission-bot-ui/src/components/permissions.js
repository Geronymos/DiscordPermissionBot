import React from 'react';
import { Table, Popover, OverlayTrigger, Tooltip, Form, Badge } from 'react-bootstrap';

// use like flags[0].name
import flags from '../permission_codes.json';

function Permsissions({ activeRole }) {
    console.log("activeRole", activeRole);

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

    const color = "#" + (activeRole.role.color || 8948369).toString(16);

    return (
        <>
            <h2>Role: <Badge className="mr-1" variant="primary" style={{ background: color }}>{activeRole.role.name}</Badge> in {activeRole.channel.name}</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Permsission</th>
                        <th>Deny</th>
                        <th>Default</th>
                        <th>Allow</th>
                    </tr>
                </thead>
                <tbody>
                    {getChannelRolePermission(flags, activeRole.permission_overwrites).map( (flag, key) => {
                        const popover = (
                            <Popover id="popover-basic">
                                <Popover.Title as="h3">Description</Popover.Title>
                                <Popover.Content>
                                    {flag.description}
                              </Popover.Content>
                            </Popover>
                        );
                        return (
                            <tr>
                                <td>
                                    <OverlayTrigger placement="right" overlay={popover}>
                                        <span>{flag.name}</span>
                                    </OverlayTrigger>
                                </td>
                                <td><Form.Check inline type="radio" id={flag.code} checked={flag.allow}/></td>
                                <td><Form.Check inline type="radio" id={flag.code} checked={flag.deny}/></td>
                                <td><Form.Check inline type="radio" id={flag.code} checked={!flag.deny && !flag.allow}/></td>
                            </tr>
                        )}
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default Permsissions;