import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom'
import router from 'router'

// import Keycloak from 'keycloak-js';

// export interface InitOptions {
//     url: string;
//     realm: string;
//     clientID: string;
// }
// const initOptions = {
//   url: 'http://localhost:18000/',
//   realm: 'personalFinanceWebsite',
//   clientId: 'personalFinanceWebsite',
//   // grant_type: 'password',
//   // scope: 'openid',
//   // client_secret: 'Yv3guRNm2pajM1Oimpacn2D8uZwVDHTE'
// }
// let kc = new Keycloak(initOptions)
// kc.init({
//   onLoad: 'login-required',
//   checkLoginIFrame: true,
//   pkceMethod: 'S256'
// }).then((auth) => {
//   if (!auth){
//     window.location.reload();
//   }else{
//     console.info("Auth")
//     console.log("auth", auth)
//     console.log("kc", kc)
//     console.log("token", kc.token)

//     kc.onTokenExpired = () => {
//       console.log("token expired")
//     }

//   }
// }, () => {
//   console.log("auth failed")
// })



function App() {
  return (
    <RouterProvider router={router}/>
  );
  
}

export default App;
