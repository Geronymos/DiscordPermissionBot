import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import Channel from './channel.js';

function Channels({ data, setActiveRole, setActiveChannel }) {

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
                    <Channel channel={channel} key={key} roles={data.roles} setActiveRole={setActiveRole} setActiveChannel={setActiveChannel}></Channel>
                )}
            </tbody>
        </Table>
    );
}

export default Channels;