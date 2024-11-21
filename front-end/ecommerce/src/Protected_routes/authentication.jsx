import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import session_cheker from "./session-cheker";
import { ClipLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isAuth: null,
    user: null,
    id: null,
    error: null,
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await session_cheker();

        if (response?.user_id) {
          setState({
            isAuth: true,
            user: response.user,
            id: response.user_id,
            error: null,
          });
        } else {
          setState({
            isAuth: false,
            user: null,
            id: null,
            error: null,
          });
          navigate('/auth');
        }
      } catch (err) {
        setState({
          isAuth: false,
          user: null,
          id: null,
          error: "Session check failed",
        });
        navigate('/auth'); 
      }
    };

    checkSession();
  }, [navigate]);

  const { isAuth, error } = state;

  if (isAuth === null) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ClipLoader color="#007bff" size={50} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <>{isAuth ? children : null}</>;
};

export default ProtectedRoute;
