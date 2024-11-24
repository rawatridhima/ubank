import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Login.css";
import UserService from "../Services/UserService";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";
import { onValue, ref } from "firebase/database";
import { db } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../AuthReducer";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [logins, setLogin] = useState(false);
  const [datas, setData] = useState("");
  const [loginData, setLoginData] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth=useSelector(x=>x.auth);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (await UserService.checkEmailExists(datas?.email)) {
      toast.error("email already exists!");
    } else {
      const res = await UserService.create({
        ...datas,
        balance: 0,
        pass: encryptData(datas.pass),
      });
      toast.success("Registered Successfully!");
      console.log(res);
      setLogin(true);
    }
    setData("");
  };

  const encryptData = (word) => {
    return bcrypt.hashSync(word, 5);
  };
  const compareEncryptedData = (userData, HashData) => {
    return bcrypt.compareSync(userData, HashData);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email === "" || loginData.pass === "") {
      toast.error("Both the Fields are Mandatory.");
    } else {
      try {
        onValue(ref(db, `users/`), (snapshot) => {
          if(!auth.isAuth){
            console.log(!auth.isAuth)
            const data1 = snapshot.val();
            let flag = false;
            Object.values(data1).forEach((user) => {
              console.log(!auth.isAuth)
              if (user.email.toLowerCase() === loginData.email.toLowerCase()) {
                flag = true;
                console.log(user);
                console.log(loginData.pass, user.pass);
                if (compareEncryptedData(loginData.pass, user.pass)) {
                  dispatch(
                    login({
                      user: { ...user, pass: null },
                    })
                  );
                  toast.success("login successfully");
                  navigate("/dash");
                } else {
                  toast.error("Incorrect Password");
                }
              }
            });
            if (!flag) {
              toast.error("Email is not Registerd yet!");
            }
          }
         
        });
      } catch (error) {
        toast.error("login failed");
      }
    }
    // setData("");
    navigate("/dash");
  };

  if (logins)
    return (
      <div className="loginscreen">
        <div className="main">
          <h1>Login</h1>
          <div className="content">
            <div className="inputcontrol">
              <label htmlFor="email">Email Address</label>
              <input
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                type="email"
                name="email"
                value={loginData.email}
              />
            </div>
            <div className="passcontrol">
              <div className="box">
                <label htmlFor="pass">Password</label>
                <input
                  onChange={(e) =>
                    setLoginData({ ...loginData, pass: e.target.value })
                  }
                  type={showPassword ? "text" : "password"}
                  name="pass"
                  value={loginData.pass}
                />
              </div>
              {showPassword ? (
                <AiFillEye
                  className="icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <div className="btn" onClick={handleLogin}>
            <h3>Sign in</h3>
          </div>
          <div className="line">
            <h5>
              Not registered?{" "}
              <span onClick={() => setLogin(false)}>register</span>
            </h5>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="loginscreen">
        <div className="main">
          <h1>Register</h1>
          <div className="content">
            <div className="inputcontrol">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => setData({ ...datas, name: e.target.value })}
                name="name"
                value={datas.name}
              />
            </div>
            <div className="inputcontrol">
              <label htmlFor="email">Email Address</label>
              <input
                onChange={(e) => setData({ ...datas, email: e.target.value })}
                type="email"
                name="email"
                value={datas.email}
              />
            </div>
            <div className="inputcontrol">
              <label htmlFor="pno">Mobile Number</label>
              <input
                onChange={(e) =>
                  setData({ ...datas, mobile_number: e.target.value })
                }
                name="pno"
                value={datas.mobile_number}
              />
            </div>
            <div className="passcontrol">
              <div className="box">
                <label htmlFor="pass">Password</label>
                <input
                  onChange={(e) => setData({ ...datas, pass: e.target.value })}
                  type={showPassword ? "text" : "password"}
                  name="pass"
                />
              </div>
              {showPassword ? (
                <AiFillEye
                  className="icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          <div className="btn" onClick={handleRegister}>
            <h3>Register</h3>
          </div>
          <div className="line">
            <h5>
              Already registered?{" "}
              <span onClick={() => setLogin(true)}>login</span>
            </h5>
          </div>
        </div>
      </div>
    );
};

export default Login;
