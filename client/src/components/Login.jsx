import React, { useEffect, useState } from "react";
import "../assets/css/logincss.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  var [data, setdata] = useState({
    username: "",
    password: "",
  });

  var navigate = useNavigate();
  function getData(e) {
    var name = e.target.name;
    var value = e.target.value;
    setdata((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  async function handleLogin(e) {
    e.preventDefault();
    var response = await fetch("http://localhost:3000/api/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    response = await response.json();
    if (response.success) {
      localStorage.setItem("login", true);
      localStorage.setItem("userid", response.data._id);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("token", response.token);
      navigate("/chats");
    } else {
      alert("Invalid Credential");
    }
  }
  useEffect(() => {
    if (localStorage.getItem("login")) navigate("/chats");
  }, []);

  return (
    <div>
      <section className="login-12">
        <div className="container">
          <div className="login-box">
            <div className="inner">
              <div className="details">
                <h3>Login</h3>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="username"
                      className="input-text"
                      placeholder="User_123"
                      onChange={getData}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="input-text"
                      placeholder="******"
                      onChange={getData}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="Btn">
                      Login Now
                    </button>
                  </div>
                </form>
                <div className="para">
                  <p>
                    Don't have an account?
                    <Link to={"/signup"}> Sign Up </Link>
                  </p>
                </div>
              </div>
              <div className="aside">
                <div className="logo">
                  <Link to={"/chats"}>Chat</Link>
                  <span>.</span>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt Lorem Ipsum
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
