// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/home";
// import CVEPage from "./pages/CVEPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/cves/:cveId" element={<CVEPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CVEPage from "./pages/CVEPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cves/:cveId" element={<CVEPage />} /> {/* Correct param name */}
      </Routes>
    </Router>
  );
}

export default App;
