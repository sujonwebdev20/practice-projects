import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../store/action/authAction.js";

const Register = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  /***** Form input handle *****/
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [loadImage, setLoadImage] = useState("");

  /***** File input handle *****/
  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  /***** Form submit handle *****/
  const register = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", state.username);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("confirmPassword", state.confirmPassword);
    formData.append("image", state.image);

    dispatch(userRegister(formData));
    console.log(state);
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h1>Register</h1>
        </div>
        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={state.username}
                name="username"
                onChange={inputHandle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={state.email}
                name="email"
                onChange={inputHandle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={state.password}
                name="password"
                onChange={inputHandle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm password"
                value={state.confirmPassword}
                name="confirmPassword"
                onChange={inputHandle}
              />
            </div>
            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? <img src={loadImage} /> : ""}
                </div>
                <div className="file">
                  <label htmlFor="image">Select image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={fileHandle}
                  />
                </div>
              </div>
            </div>
            <div type="submit" value="Register" className="form-group">
              <input type="submit" value="Register" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to="/messenger/login">
                  Already have an account? Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
