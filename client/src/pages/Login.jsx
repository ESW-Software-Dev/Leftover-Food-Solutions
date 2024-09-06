import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import ReactDOM from 'react-dom';
import Logo from "../components/Logo.jsx";
import About from './AboutPage.jsx';

function Login() {
  return (
    <GoogleLogin onSuccess={(credentialResponse) => { console.log(credentialResponse); }}
      onError={() => { console.log("Login Failed"); }} />
  );
}

export default Login;
// const Login = () => {
//   return (
//     <>
//       {/* <div class="topnav" margin-bottom="120px">
//         <Logo />
//         <a class="active" href="#login">Login</a>
//         <a href="#post">Post Leftover Food</a>
//         <a href="#searchpage">Find Leftover Food</a>
//         <a href="#about">About</a>
//       </div> */}

//       <center><h1>Log in with your Cornell NetID</h1></center>

//       <center>
//         <div className="col-lg-12 login-form">
//           <div className="col-lg-12 login-form">
//             <form className="login">
//               <div className="login__field">
//                 <i className="login__icon fas fa-user"></i>
//                 <input type="text" className="login__input" placeholder="NetID" />
//               </div>
//               <div className="login__field">
//                 <i className="login__icon fas fa-lock"></i>
//                 <input type="password" className="login__input" placeholder="Password" />
//               </div>
//               <button className="button login__submit">
//                 <span className="button__text">Log in</span>
//               </button>
//             </form>
//           </div>
//         </div>
//       </center>
//     </>
//   )
// }


