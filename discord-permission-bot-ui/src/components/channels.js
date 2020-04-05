import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import Channel from './channel.js';

function Channels({ data, setActiveRole }) {

    return (
        <Table>
            <thead>
                <tr>
                    <th>Channel</th>
                    <th>Roles</th>
                </tr>
            </thead>
            <tbody>
                {data.channels.map((channel) =>
                    <Channel channel={channel} roles={data.roles} setActiveRole={setActiveRole}></Channel>
                )}
            </tbody>
        </Table>
    );
}

export default Channels;