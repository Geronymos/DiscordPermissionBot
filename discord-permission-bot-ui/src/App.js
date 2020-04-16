import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { bot_url, server_id } from './config.json';


import { Navbar, Nav, Carousel, Container, Badge } from 'react-bootstrap';
import Channels from './components/channels';
import Permissions from './components/permissions';
import githublogo from './media/GitHub-Mark-32px.png';
import RoleList from './components/roleList';
// import Search from './components/search';

function App() {
  var [data, setData] = React.useState({ channels: [], roles: [] });
  var [activeRole, setActiveRole] = React.useState(); 
  var [activeChannel, setActiveChannel] = React.useState(); 
  const activeRoleColor = "#" + (activeRole?.color || 8948369).toString(16);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(bot_url + "/?server=" + server_id);
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  function getPermissionOverwrites() {
    return activeChannel?.permission_overwrites.find( ({id}) => parseInt(id) === activeRole?.id );
  }

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
        <Carousel.Item id="permissions">
          <Container>
            <RoleList roles={data.roles} activeRole={activeRole} setActiveRole={setActiveRole}></RoleList>
          </Container>
        </Carousel.Item>
        <Carousel.Item id="channels">
          <Container>
            <h2>Role: <Badge className="mr-1" variant="primary" style={{ background: activeRoleColor }}>{activeRole?.name}</Badge> in {activeChannel?.name}</h2>
            <Permissions allowCode={getPermissionOverwrites()?.allow} denyCode={getPermissionOverwrites()?.deny}></Permissions>
          </Container>
        </Carousel.Item>
        <Carousel.Item id="permissions">
          <Container>
            <Channels data={data} setActiveRole={setActiveRole} setActiveChannel={setActiveChannel}></Channels>
          </Container>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default App;
