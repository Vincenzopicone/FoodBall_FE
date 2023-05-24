import "./Navbar.css";

const NavBar = () => {
  return (
    <nav className="navBar px-3 bg-secondary">
      <div className=" d-flex justify-content-center ">
        <h1 className="titleNav bg-dark rounded-circle py-2 px-3">
          <span className="text-success">F</span>
          <span>o</span>
          <span>o</span>
          <span className="text-danger">d</span>Ball
        </h1>
      </div>
    </nav>
  );
};

export default NavBar;
