import React from 'react';
import { Table } from 'react-bootstrap';

function Permsissions({activeRole}) {
    return (
        <>
        <h2>Role: {activeRole ? activeRole.name : ""}</h2>
        <Table>
            <thead>
                <tr>
                    <th>Permsission</th>
                    <th>Allow</th>
                    <th>Deny</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </Table>
        </>
    );
}

export default Permsissions;