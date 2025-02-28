import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CVEDetails = () => {
  const { cveId } = useParams();
  const [cve, setCve] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cves/${cveId}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setCve(response.data || {});
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching CVE:", error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [cveId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const description = cve?.descriptions?.[0]?.value ?? "N/A";
  const cvss = cve?.metrics?.cvssMetricV2?.[0]?.cvssData ?? {};
  const scores = cve?.metrics?.cvssMetricV2?.[0] ?? {};
  const configurations = cve?.configurations?.nodes ?? [];
  const severity = cve?.metrics?.cvssMetricV2?.[0]?.baseSeverity ?? "N/A";


  return (
    <div style={{ padding: "20px" }}>
      <h2>{cve.id || "No CVE ID"}</h2>
      <p><strong>Description:</strong> {description}</p>
      <h3>CVSS V2 Metrics:</h3>
      <p><strong>Severity:</strong> {severity ?? "N/A"} &nbsp; | &nbsp; <strong>Score:</strong> {cvss.baseScore ?? "N/A"}</p>
      <p><strong>Vector String:</strong> {cvss.vectorString ?? "N/A"}</p>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Access Vector</th>
            <th>Access Complexity</th>
            <th>Authentication</th>
            <th>Confidentiality Impact</th>
            <th>Integrity Impact</th>
            <th>Availability Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cvss.accessVector ?? "N/A"}</td>
            <td>{cvss.accessComplexity ?? "N/A"}</td>
            <td>{cvss.authentication ?? "N/A"}</td>
            <td>{cvss.confidentialityImpact ?? "N/A"}</td>
            <td>{cvss.integrityImpact ?? "N/A"}</td>
            <td>{cvss.availabilityImpact ?? "N/A"}</td>
          </tr>
        </tbody>
      </table>

      <h3>Scores:</h3>
      <p><strong>Exploitability Score:</strong> {scores.exploitabilityScore ?? "N/A"}</p>
      <p><strong>Impact Score:</strong> {scores.impactScore ?? "N/A"}</p>

      {/* <h3>CPE (Common Platform Enumeration):</h3> */}
      {/* <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Criteria</th>
            <th>Match Criteria ID</th>
            <th>Vulnerable</th>
          </tr>
        </thead>
        <tbody>
          {configurations.map((node, index) => (
            node.cpeMatch.map((cpe, subIndex) => (
              <tr key={`${index}-${subIndex}`}>
                <td>{cpe.criteria ?? "N/A"}</td>
                <td>{cpe.matchCriteriaId ?? "N/A"}</td>
                <td>{cpe.vulnerable ? "Yes" : "No"}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default CVEDetails;
