import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { bot_url, server_id } from './config.json';

// normal JSON.parse cuts of last two symbols from IDs
import * as JSONbig from 'json-bigint';

import { Navbar, Nav, Container } from 'react-bootstrap';
import githublogo from './media/GitHub-Mark-32px.png';
import SubmitForm from './components/submitForm';
// import Search from './components/search';

function App() {
  const [data, setData] = useState({ channels: [], roles: [] });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(bot_url + "/getData.php?server=" + server_id);
      const text = await response.text()
      // const result = await response.json();
      const result = JSONbig.parse(text);
      console.log("id", result.roles[0].id.toString());
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
      <Container>
        <h2>Check and submit</h2>
        <SubmitForm data={data}/>
      </Container>
    </div>
  );
}

export default App;
