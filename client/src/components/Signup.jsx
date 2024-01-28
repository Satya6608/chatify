import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  var [data, setdata] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  var [msg, setmsg] = useState("");
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
  async function handleSignup(e) {
    e.preventDefault();
    if (data.password !== data.cpassword) {
      setmsg("Password and Confirm Password Doesn't Matched!!!");
      alert(msg);
    } else {
      var item = {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      };
      var response = await fetch("http://localhost:3000/api/signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(item),
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
        setmsg(response.message);
        alert(response.message);
      }
    }
  }
  useEffect(() => {
    if (localStorage.getItem("login")) navigate("/chats");
  }, []);
  return (
    <div>
      <section class="login-12">
        <div class="container">
          <div class="login-box">
            <div class="inner">
              <div class="details">
                <h3>Sign Up</h3>
                <form onSubmit={handleSignup}>
                  <div class="form-group">
                    <input
                      type="text"
                      name="name"
                      class="input-text"
                      placeholder="User_123"
                      onChange={getData}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      name="username"
                      class="input-text"
                      placeholder="User_123"
                      onChange={getData}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      name="email"
                      class="input-text"
                      placeholder="youremail@domain.com"
                      onChange={getData}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      class="input-text"
                      placeholder="******"
                      onChange={getData}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      name="cpassword"
                      id="cpassword"
                      class="input-text"
                      placeholder="******"
                      onChange={getData}
                    />
                  </div>
                  <div class="form-group">
                    <button type="submit" class="Btn">
                      Free Signup
                    </button>
                  </div>
                </form>
                <div class="para">
                  <p>
                    Already have an account?
                    <Link to="/">LOGIN</Link>
                  </p>
                </div>
              </div>
              <div class="aside">
                <div class="logo">
                  <Link to="/">Chat</Link>
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
