import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
        <div className="buttonContainer">
        <Link className="btn btn-info" to="/">
          Home
        </Link>
        </div>
     
      <div className="notFoundContainer">
        <h2>ooppPss!!!</h2>
        <h1>ERROR 404</h1>
      </div>
      <div className="buttonContainer1">
      <Link className="btn btn-danger" onClick={() => navigate(-1)}>
          Back
        </Link>
        </div>
    
    </div>
  );
}

export default NotFound;
