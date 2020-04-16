import React from 'react';
import { FormControl, ListGroup, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

function RoleList({ channels, activeChannel, setActiveChannel, onChange = () => {} }) {
    const [input, setInput] = React.useState('');

    return (
        <>
            <h1>Select channels</h1>
            <FormControl onChange={e => setInput(e.target.value)}></FormControl>
            <ToggleButtonGroup type="checkbox" name="options" onChange={onChange} vertical className="w-100 mt-2">
                {channels
                    .sort(channel => !channel.name.toLowerCase().includes(input.toLowerCase()))
                    .map(channel => (
                        <ToggleButton variant="outline-primary" value={channel}>{channel.name}</ToggleButton>
                    ))}
            </ToggleButtonGroup>
        </>
    );
}

export default RoleList;