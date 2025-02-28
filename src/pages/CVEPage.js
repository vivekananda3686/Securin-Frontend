// import CVEDetails from "../components/CVEDetails";

// const CVEPage = () => <CVEDetails />;

// export default CVEPage;



import { useParams } from "react-router-dom";
import CVEDetails from "../components/CVEDetails";

const CVEPage = () => {
  const { cveId } = useParams();
  return <CVEDetails cveId={cveId} />;
};

export default CVEPage;
