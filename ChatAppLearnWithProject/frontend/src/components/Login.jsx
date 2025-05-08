import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="card-header">
          <h1>Login</h1>
        </div>
        <div className="card-body">
          <form action="">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div type="submit" value="Register" className="form-group">
              <input type="submit" value="Register" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to="/messenger/register">Register an account?</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
