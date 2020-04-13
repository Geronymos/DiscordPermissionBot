import React from 'react';
import { Table, Popover, OverlayTrigger, Form, Col, Badge, ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';

// use like flags[0].name
import flags from '../permission_codes.json';

function Permsissions({ allowCode = 0, denyCode = 0, callback = () => {} }) {
    const [allow, setAllow] = React.useState(allowCode);
    const [deny, setDeny] = React.useState(denyCode);

    // update hooks from props
    React.useEffect(() => {
        setAllow(allowCode);
        setDeny(denyCode);
    }, [allowCode, denyCode]);

    // call callback everytime hooks are updated
    React.useEffect(() => {
        callback(allow, deny);
    }, [allow, deny]);

    /**
     * Checks if all permssions are set to allow, deny or default and returns a string containing the result
     * @returns {string} allow, deny or default
     */
    function allSame() {
        function checker(val) {
            return ((this & parseInt(val.code)) === parseInt(val.code));
        }
        const allAllow = flags.every(checker, allow);
        const allDeny = flags.every(checker, deny);

        return allAllow ? "allow" : allDeny ? "deny" : "default";
    }

    /**
     * Changes all permissions to a given value
     * @param {string} value - Value to change all permissions to
     */
    function changeAll(value) {
        const reducer = (acc, val) => acc | parseInt(val.code);
        const code = flags.reduce(reducer, 0);
        switch (value) {
            case "allow":
                setAllow(code);
                setDeny(0);
                break;
            case "deny":
                setAllow(0);
                setDeny(code);
                break;
            case "default":
                setAllow(0);
                setDeny(0);
        }

    }

    /**
     * Checks for flags that are set
     * @param {string | number} allowCode 
     * @param {string | number} denyCode
     * @returns {object} {name, code, description, allow, deny}
     */
    function decodePermissions(allowCode, denyCode) {
        return flags.map(({ code, name, description }) => ({
            name,
            code,
            description,
            allow: (parseInt(allowCode) & parseInt(code)) === parseInt(code),
            deny: (parseInt(denyCode) & parseInt(code)) === parseInt(code)
        }));
    }

    /**
     * adds permission to allow and deny hooks (bitSets)
     * @param {string} codeString 
     * @param {string} value 
     */
    function encodePermissions(codeString, value) {
        const code = parseInt(codeString);
        if (value === false) return;
        switch (value) {
            case "allow":
                // add code to allow bitset (or)
                setAllow((allow | code));
                // if code is in deny bitset remove it from deny bitset (nand)
                setDeny((deny & ~code));
                break;
            case "deny":
                setDeny(deny | code);
                setAllow(allow & ~code);
                break;
            default:
                setAllow(allow & ~code);
                setDeny(deny & ~code);
        }
    }

    return (
        <>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridAllow">
                        <Form.Label>Allow bitset</Form.Label>
                        <Form.Control value={allow} placeholder="Not required" onChange={e => setAllow(parseInt(e.target.value || 0))} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDeny">
                        <Form.Label>Deny bitset</Form.Label>
                        <Form.Control value={deny} placeholder="Not repuired" onChange={e => setDeny(e.target.value)} />
                    </Form.Group>
                </Form.Row>
            </Form>
            <Table>
                <thead>
                    <tr>
                        <th>Permsission (set for all)</th>
                        <th>
                            <ToggleButtonGroup type="radio" name="options" value={allSame()} onChange={changeAll}>
                                <ToggleButton value={"deny"}>{"❌"}</ToggleButton>
                                <ToggleButton value={"default"}>{"➖"}</ToggleButton>
                                <ToggleButton value={"allow"}>{"✔"}</ToggleButton>
                            </ToggleButtonGroup>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {decodePermissions(allow, deny).map((flag, key) => {
                        const popover = (
                            <Popover id="popover-basic">
                                <Popover.Title as="h3">Description</Popover.Title>
                                <Popover.Content>
                                    {flag.description}
                                </Popover.Content>
                            </Popover>
                        );
                        return (
                            <tr key={key}>
                                <td>
                                    <OverlayTrigger placement="right" overlay={popover}>
                                        <span>{flag.name}</span>
                                    </OverlayTrigger>
                                </td>
                                <td>
                                    <ToggleButtonGroup type="radio" name="options" value={flag.allow ? "allow" : flag.deny ? "deny" : "default"} onChange={(value) => encodePermissions(flag.code, value)}>
                                        <ToggleButton variant="secondary" value={"deny"}>{"❌"}</ToggleButton>
                                        <ToggleButton variant="secondary" value={"default"}>{"➖"}</ToggleButton>
                                        <ToggleButton variant="secondary" value={"allow"}>{"✔"}</ToggleButton>
                                    </ToggleButtonGroup>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default Permsissions;