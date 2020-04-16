import React from 'react';
import { FormControl, ListGroup } from 'react-bootstrap';

function RoleList({ roles, activeRole, setActiveRole }) {
    const [input, setInput] = React.useState('');

    return (
        <> 
            <h1>Select a role</h1>
            <FormControl onChange={e => setInput(e.target.value)}></FormControl>
            <ListGroup className="mt-2" activeKey={activeRole?.name}>
                {roles
                .filter(role => role.name.toLowerCase().includes(input.toLowerCase()))
                .map(role => (
                    <ListGroup.Item action eventKey={role.name} onClick={()=>setActiveRole(role)}style={{ color: "#" + (role.color || 8948369).toString(16) }}>{role.name}</ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}

export default RoleList;