import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { bot_url, server_id } from './config.json';
import { Container, Table, Badge, Button } from 'react-bootstrap';

function App() {
  var [data, setData] = React.useState({ channels: [], roles: [] });

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(bot_url + "/?server=" + server_id);
      const result = await response.json();
      setData(result)
    }
    fetchData();
  }, []);

  function channelGetRoles(channels, channel) {
    const roleIDs = channel.permission_overwrites.map(overwrite => parseInt(overwrite.id));
    const roles = data.roles.filter(role => roleIDs.includes(role.id));
    return roles;
  }

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Channel</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {data.channels.map((channel, key) =>
            <tr key={key} >
              <td>{channel.name}</td>
              <td>{channelGetRoles(data.channels, channel).map(role => {
                const color = "#" + (role.color || 8948369).toString(16);
                // return <Button variant="outline-primary" className="mr-1" size="sm" style={{borderColor: color, color}}>{role.name}</Button>
                return <Badge className="mr-1" variant="primary" style={{ background: color }}>{role.name}</Badge>
              })
              }</td>
            </tr>
          )}
          <tr>
          </tr>
          <tr></tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
