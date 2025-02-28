// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CVEList = () => {
//   const [cves, setCves] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("https://services.nvd.nist.gov/rest/json/cves/2.0")
//       .then((response) => {
//         console.log("API Response:", response.data);
//         setCves(response.data.vulnerabilities || []);
//       })
//       .catch((error) => console.error("Error fetching CVEs:", error));
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>CVE List</h2>
//       <table border="1" cellPadding="8" cellSpacing="0" width="100%">
//         <thead>
//           <tr style={{ background: "#f2f2f2" }}>
//             <th>CVE ID</th>
//             <th>Identifier</th>
//             <th>Published Date</th>
//             <th>Last Modified</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cves.length > 0 ? (
//             cves.map((item, index) => {
//               const cve = item.cve || {};
//               return (
//                 <tr
//                   key={index}
//                   onClick={() => navigate(`/cves/${cve.id}`)} // Ensure the route matches App.js
//                   style={{ cursor: "pointer" }}
//                 >
//                   <td>{cve.id || "N/A"}</td>
//                   <td>{cve.sourceIdentifier || "N/A"}</td>
//                   <td>{cve.published || "N/A"}</td>
//                   <td>{cve.lastModified || "N/A"}</td>
//                   <td>{cve.vulnStatus || "N/A"}</td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan="5" style={{ textAlign: "center" }}>
//                 Loading...
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CVEList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CVEList = () => {
  const [cves, setCves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://services.nvd.nist.gov/rest/json/cves/2.0")
      .then((response) => {
        console.log("API Response:", response.data);
        setCves(response.data.vulnerabilities || []);
      })
      .catch((error) => console.error("Error fetching CVEs:", error));
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = cves.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(cves.length / recordsPerPage);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>CVE LIST</h2>
      <p style={{ fontWeight: "bold" }}>Total Records: {cves.length}</p>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr style={{ background: "#e0e0e0", fontWeight: "bold" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>CVE ID</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>IDENTIFIER</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>PUBLISHED DATE</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>LAST MODIFIED DATE</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((item, index) => {
              const cve = item.cve || {};
              return (
                <tr
                  key={index}
                  onClick={() => navigate(`/cves/${cve.id}`)}
                  style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}
                >
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>{cve.id || "N/A"}</td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>{cve.sourceIdentifier || "N/A"}</td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>{cve.published || "N/A"}</td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>{cve.lastModified || "N/A"}</td>
                  <td style={{ padding: "10px", border: "1px solid #ccc" }}>{cve.vulnStatus || "N/A"}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <div>
          <label style={{ fontWeight: "bold" }}>Results per page: </label>
          <select
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            style={{ marginLeft: "5px", padding: "5px" }}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        
        <div>
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
          )}
          {[...Array(totalPages)].slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{ margin: "0 5px", fontWeight: currentPage === index + 1 ? "bold" : "normal" }}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVEList;