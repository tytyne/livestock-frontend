import React from 'react';
// import Navbar from "./components/Dashboard/Navbar"
// import Sider from "./components/Dashboard/Sider"
// import Footer from "./components/Dashboard/Footer"

import Appr from "./App"


const Appshell = ({children}) => {
    return (
        <> 
        <hr className="new5"></hr>
        <div className="container">
            <Appr/>
           
           
      <main>
        <div class="main__container">
        {children}
        </div>
        {/* <Footer/> */}
        </main>
            

        {/* <Sider/> */}
            </div>
            </>
     );
}
 
export default Appshell;