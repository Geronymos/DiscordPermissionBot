import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { bot_url, server_id } from './config.json';
import { Container, Row, Col } from 'react-bootstrap';
import Channels from './components/channels';
import Permissions from './components/permissions';

function App() {
  var [data, setData] = React.useState({ channels: [], roles: [] });
  var [activeRole, setActiveRole] = React.useState();

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(bot_url + "/?server=" + server_id);
      const result = await response.json();
      setActiveRole(result.roles[0]);
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={6}>
          <Channels data={data} setActiveRole={setActiveRole}></Channels>
        </Col>
        <Col lg={6}>
          <Permissions activeRole={activeRole}></Permissions>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
