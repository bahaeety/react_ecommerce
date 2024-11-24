import axios from "axios";
const session_cheker = async () => {
  
  try {
    const session = await axios.get('/user/session-checker');

    if (!session.data) {
      throw new Error('Session data is invalid');
    }
    console.log(session.data)

    return session.data;
  } catch (e) {
    console.error("Error in session checker:", e.message);
    return null;
  }
};

export default session_cheker;
