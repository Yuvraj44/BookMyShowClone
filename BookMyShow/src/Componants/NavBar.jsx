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
                                <NavDropdown.Item href="/api/movie/create">Add Movie</NavDropdown.Item>
                                <NavDropdown.Item href="/api/movie/edit">Edit Movie</NavDropdown.Item>
                                <NavDropdown.Item href="/api/user">Manage Admin Access</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </div>

                <Nav className="ms-auto">
                    <NavDropdown
                        title={
                            <Image
                                src={user?.picture || "https://media.istockphoto.com/id/517998264/vector/male-user-icon.jpg?s=612x612&w=0&k=20&c=4RMhqIXcJMcFkRJPq6K8h7ozuUoZhPwKniEke6KYa_k="}
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