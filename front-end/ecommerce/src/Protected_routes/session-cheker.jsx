import axios from "axios";
const session_cheker = async () => {
   try {
     const session = await axios.get('/user/session-checker');
 
     if (!session.ok) {
       const errorResponse = await session.json();
       throw new Error(errorResponse.message || 'Session check failed');
     }
 
     const response = await session.json();
     return response;
   } catch (e) {
     console.error("Error in session checker:", e.message);
     return null;
   }
 };
 
 export default session_cheker;
 