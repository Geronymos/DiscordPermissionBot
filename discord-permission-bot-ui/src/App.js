import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { bot_url, server_id } from './config.json';
import { Container, Table } from 'react-bootstrap';

function App() {
  var [data, setData] = React.useState({channels: [], roles: []});

  React.useEffect( () => {
    async function fetchData() {
      const response = await fetch( bot_url + "/?server=" + server_id);
      const result = await response.json();
      setData(result)
    }
    fetchData();
  }, [] );

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
          {data.channels.map( (channel, key) => 
            <tr key={key} >
              <td>{channel.name}</td>
              <td>{ channel.permission_overwrites.map( overwride => data.roles.find( role => role.id === parseInt(overwride.id) ).name ).join(", ") }</td>
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
