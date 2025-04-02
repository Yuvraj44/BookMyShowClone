import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

function NavBar() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{ height: '100px' }}>
            <Container>
                <div className="d-flex align-items-center">
                    <Navbar.Brand href="/api/home">
                        <img
                            src="https://getlogo.net/wp-content/uploads/2020/04/bookmyshow-logo-vector.png"
                            style={{ height: '50px', width: '100px' }}
                            alt="BookMyShow"
                        />
                    </Navbar.Brand>

                    <Nav className="ms-3" style={{ fontSize: '20px', gap: '10px' }}>
                        <Nav.Link href="/api/home">Home</Nav.Link>
                        <Nav.Link href="/api/movies">Movies</Nav.Link>

                        {user?.isAdmin && (
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/api/admin/addmovie">Add Movie</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </div>

                <Nav className="ms-auto">
                    <NavDropdown
                        title={
                            <Image
                                src={user?.picture || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D"}
                                roundedCircle
                                style={{ width: '50px', height: '50px' }}
                            />
                        }
                        id="profile-nav-dropdown"
                        align="end"
                    >
                        <NavDropdown.Item href="/api/profile">View Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/api/booking">My Bookings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/api/logout">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;