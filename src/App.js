import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Haznaka from "../src/components/Haznaka";
import FilteredResponders from "../src/components/FilteredResponders";
import TestWebsocket from "./components/TestWebsocket/TestWebsocket";
import { ConanimProvider } from "./contexts/context";
import ShowConanim from "./components/ManageConanim";
import Container from "./components/Container/Container";
import './App.css'
import { MobileProvider } from "./contexts/MobileContext";

function App() {
  return (
    <ConanimProvider>
      <MobileProvider>
        <Router>
          <Container>
            <Routes>
              <Route path="/" element={<Haznaka />} />
              <Route path="/conanim" element={<ShowConanim />} />
              <Route path="/filtered-responders" element={<FilteredResponders />} />
              <Route path="/testWS" element={<TestWebsocket />} />
            </Routes>
          </Container>
        </Router>
      </MobileProvider>
    </ConanimProvider>
  );
}

export default App;

// import './App.css';
// import EmergencySetup from './components/EmergencySetup';
// import Haznaka from './components/Haznaka';

// function App() {
//   return (
//     <div className="App">
//       {/* <EmergencySetup></EmergencySetup> */}
//       <Haznaka></Haznaka>
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//   );
// }

// export default App;
