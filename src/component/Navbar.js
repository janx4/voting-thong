import { LinkContainer } from "react-router-bootstrap";
import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Navbar, Container } from "react-bootstrap";

function NavbarComponent(props) {
    const [address, setAddress] = useState(undefined);

    useEffect(() => {
        setAddress(props.address);
    }, [props.address]);

    return (
        <div className="container">
            <Navbar>
                <Container>
                    <Navbar.Brand href="/home">Voting App</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <u>{address}</u>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Nav fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <LinkContainer to="/home">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/createvote">
                        <Nav.Link>Create Vote</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/votes">
                        <Nav.Link>Votes</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default NavbarComponent;
