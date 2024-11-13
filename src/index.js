import React from "react";
import Reactdom from 'react-dom/client';
const element=document.getElementById("root");
const vir=Reactdom.createRoot(element);
import Loginpage from "./loginpage.js";
vir.render(<Loginpage />);