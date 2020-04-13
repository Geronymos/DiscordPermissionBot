import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { bot_url, server_id } from './config.json';


import { Navbar, Nav, Carousel, Container, Badge } from 'react-bootstrap';
import Channels from './components/channels';
import Permissions from './components/permissions';
import githublogo from './media/GitHub-Mark-32px.png';
// import Search from './components/search';

function App() {
  var [data, setData] = React.useState({ channels: [], roles: [] });
  var [activeRole, setActiveRole] = React.useState();
  const activeRoleColor = "#" + (activeRole?.role.color || 8948369).toString(16);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(bot_url + "/?server=" + server_id);
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand href="#home">DiscordPermissionBot</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">How to</Nav.Link>
        </Nav>
        <Navbar.Brand href="https://github.com/Geronymos/DiscordPermissionBot">
          <img
            src={githublogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{' '}
          GitHub Repo
        </Navbar.Brand>
      </Navbar>
      <Carousel interval={null} id="bot-carousel" wrap={false}>
        <Carousel.Item id="channels">
          <Container>
            <h2>Role: <Badge className="mr-1" variant="primary" style={{ background: activeRoleColor }}>{activeRole?.role.name}</Badge> in {activeRole?.channel.name}</h2>
            <Permissions allowCode={activeRole?.permission_overwrites.allow} denyCode={activeRole?.permission_overwrites.deny}></Permissions>
          </Container>
        </Carousel.Item>
        <Carousel.Item id="permissions">
          <Container>
            <Channels data={data} setActiveRole={setActiveRole}></Channels>
          </Container>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default App;
