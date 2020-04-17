import React, {useState} from 'react';
import { Form, Button, ProgressBar } from 'react-bootstrap';
import { bot_url } from '../config.json';

function SubmitForm({ activeRole, overwrites, selectedChannels }) {
    const [progress, setProgress] = useState(0);
    const [task, setTask] = useState("");

    function send() {
        selectedChannels.map((channel, index) => {
            const data = {
                "role": activeRole.id,
                "channel": channel.id,
                overwrites
            };
            // timeout to not get banned for rate limits 
            setTimeout(function () {
                fetch(bot_url+"/changePermission.php", {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'no-cors',
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
                });
                setProgress((index/(selectedChannels.length-1))*100);
                setTask(`Set permissions for ${activeRole.name} in ${channel.name}. `)
            }, index * 1 * 1000);
        });
    }

    return (
        <Form>
            <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" readOnly value={activeRole?.name} />
            </Form.Group>

            <Form.Group controlId="allow">
                <Form.Label>Allow</Form.Label>
                <Form.Control type="text" readOnly value={overwrites?.allow} />
            </Form.Group>
            <Form.Group controlId="deny">
                <Form.Label>Deny</Form.Label>
                <Form.Control type="text" readOnly value={overwrites?.deny} />
            </Form.Group>
            <Form.Group controlId="channels">
                <Form.Label>Channels</Form.Label>
                <Form.Control as="select" readOnly multiple>
                    {selectedChannels?.map(channel => <option key={channel.id}>{channel.name}</option>)}
                </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={send}>
                Submit
            </Button>

            <ProgressBar animated now={progress} className="mt-4"/>
            <p>{task}</p>
        </Form>
    );
}

export default SubmitForm;