import React, { useState } from 'react';
import Dashboard from "./Dashboard";
import firebase from './config/firebase.js';

function App() {

  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [button, setButton] = useState(false);
  const [error, setError] = useState(false);

  const login = (e) =>{
    e.preventDefault();
    setButton(true);
    firebase.auth().signInWithEmailAndPassword(email, password).then((u) =>{
        setUser(u);
    }).catch((error) => {
        console.log(error);
        setError(true);
        setButton(false);
    });

}

const handleChange = (e) => {
  setError(false);
  if (e.target.name === "username"){
    setEmail(e.target.value);
  } else {
    setPassword(e.target.value);
  }
}

  return (
     <>
    
     { user.user === undefined ?  
 
    <div id="loginform">
      <h2 id="headerTitle">Ingreso</h2>
      <div className="row">
        <label>Correo Electrónico</label>
        <input name="username" type="email" placeholder="" onChange={handleChange}/>
      </div> 
      <div className="row">
        <label>Contraseña</label>
        <input name="password" type="password" placeholder="" onChange={handleChange}/>
      </div> 
      <div id="button" className="row">
        <button onClick={button ? null:login} style={button ? {opacity:"0.5", cursor:"wait"}:{opacity:"1"}}>Entrar</button>
      </div>
      <div className="errorMessage" style={error ? null:{opacity:"0"}}>
        Wrong email or password
      </div>
    </div>
    

     : null }
  
      { user.user !== undefined ?  <Dashboard {...{ user }} />: null }
      
      </>
  );
}



export default App;
