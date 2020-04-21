import React, { useState } from 'react';
import { Form, Button, ProgressBar } from 'react-bootstrap';
import Permissions from './permissions';

import { bot_url } from '../config.json';

function SubmitForm({ data }) {
    const [activeRole, setActiveRole] = useState();
    const [selectedChannels, setSelectedChannels] = useState([]);
    const [overwrites, setOverwrites] = useState({ allow: 0, deny: 0 });

    const [progress, setProgress] = useState(0);
    const [task, setTask] = useState("");

    function send() {
        console.log({activeRole, overwrites, selectedChannels});
        selectedChannels.map((channel, index) => {
            const data = {
                "role": activeRole.id,
                "channel": channel.id,
                overwrites
            };
            // timeout to not get banned for rate limits 
            setTimeout(function () {
                fetch(bot_url + "/changePermission.php", {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'no-cors',
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
                });

                setProgress((index / (selectedChannels.length - 1)) * 100);
                setTask(`Set permissions for ${activeRole.name} in ${channel.name}. `)
            }, index * 1 * 1000);
        });
    }

    function getSelektedChannels(event) {
        const options = [...event.target.options];
        const selected = options.filter(option => option.selected);
        const selectedIDs = selected.map(selection => selection.value);
        const selectedChannels = data.channels.filter(
            ({id}) => selectedIDs.includes(id.toString())
        );
        // console.log(selectedChannels);
        setSelectedChannels(selectedChannels);
    }

    return (
        <Form>
            <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" value={activeRole?.id} onChange={e => setActiveRole(data.roles.find(({id}) => id == e.target.value))}>
                    {data.roles.map(role => <option key={role.id} value={role.id.toString()}>{role.name}</option>)}
                </Form.Control>
            </Form.Group>

            <Permissions callback={(allow, deny) => setOverwrites({allow, deny})} />

            <Form.Group controlId="channels">
                <Form.Label>Channels</Form.Label>
                {/* <Form.Control as="select" multiple onChange={e => e.target.value?.map( value => setSelectedChannels(data.channels.find(({id}) => id == value)))}> */}
                <Form.Control as="select" multiple onChange={getSelektedChannels}>
                    {data.channels.map(channel => <option key={channel.id} value={channel.id.toString()}>{channel.name}</option>)}
                </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={send}>
                Submit
            </Button>

            <ProgressBar animated now={progress} className="mt-4" />
            <p>{task}</p>
        </Form>
    );
}

export default SubmitForm;