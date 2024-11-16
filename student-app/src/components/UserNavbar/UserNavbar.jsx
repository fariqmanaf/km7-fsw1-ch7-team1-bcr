
import "bootstrap/dist/css/bootstrap.min.css";

function UserNavbar() {
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <a className="navbar-brand" href="landing-page.html">
          <img
            src="/assets/images/logo binar.svg"
            alt="Logo"
            className="d-inline-block align-text-top"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvas"
          aria-controls="navbarOffcanvas"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-end offcanvas-half"
          tabIndex="-1"
          id="navbarOffcanvas"
          aria-labelledby="navbarOffcanvasLabel"
          style={{ width: "50%" }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="navbarOffcanvasLabel">
              BCR
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav ms-auto gap-md-4">
              <li className="nav-item">
                <a className="nav-link text-black" href="#ourservices">
                  Our Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-black" href="#whyus">
                  Why US
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-black" href="#testimonial">
                  Testimonial
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-black" href="#faq">
                  FAQ
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  style={{
                    backgroundColor: "#5cb85f",
                    width: "fit-content",
                    padding: "8px 12px",
                    borderRadius: "3px",
                  }}
                  href="#"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
