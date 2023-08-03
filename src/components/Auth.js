import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const { dispatch } = useContext(AuthContext);
  const [counter, setCounter] = useState(0)

  const submitHandler = (e) => {
    e.preventDefault();
    const responses = ['Wrong', 'WRONG AGAIN', 'ONE MORE TIME AND ILL BE MEAN', 'YOUR NEED TO DO BETTER']
    setCounter(0)
    const body = { username, password }
    axios.post(register ? "/register" : "/login", body)
      .then(res => {
        dispatch({ type: "LOGIN", payload: res.data })
      })
      .catch(err => {
        console.log(err)
        if (counter === responses.length) {
          return setCounter(0)
        }
        alert(`${responses[counter]}`)
        let newCounter = counter + 1
        setCounter(newCounter)
      })
    console.log("submitHandler called");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input className="form-input" placeholder="username" onChange={e => setUsername(e.target.value)} />
        <input className="form-input" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
