import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import headerLogo from "../logo.png";

function Header({ SwitchTheme }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-between">
          <div className="d-flex justify-content-start">
            <Link to="/">
              <img
                className="header__logo"
                src={headerLogo}
                alt="логотип страницы место"
              />
              NBudget
            </Link>
          </div>
          <p className="header__email align-self-center m-auto">
            {user && user.email}
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item m-auto navbar-light">
                <div className="form-check form-switch">
                  <input
                    className="nav-link form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onChange={SwitchTheme}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Light/Dark mode
                  </label>
                </div>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                      Profile
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button className="btn" onClick={onLogout}>
                      Sing out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
