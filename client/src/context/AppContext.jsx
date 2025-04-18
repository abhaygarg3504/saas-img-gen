import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setshowLogin] = useState(false);
  const [token, settoken] = useState(localStorage.getItem("token") || "");
  const [credit, setcredit] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";  

  const navigate = useNavigate();

  const loadCreditData = async () => {
    try {
      if (!token) {
        toast.error("Unauthorized: No token provided");
        return;
      }

      const { data } = await axios.get(`${backendURL}/api/user/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setcredit(data.credits);
        setUser(data.user);
      }
    } catch (err) {
      console.error(`Error in loadCreditData: ${err}`);
      toast.error(err.response?.data?.message || "Failed to load credit data");
    }
  };

  const generateImage = async ({ prompt }) => {
    try {
      if (!token) {
        toast.error("Unauthorized: No token provided");
        return;
      }
  
      const { data } = await axios.post(
        `${backendURL}/api/image/generate-image`,
        { prompt }, // Fix: Pass an object with a key 'prompt'
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      loadCreditData(); // Assuming this function updates credits
  
      if (data.success) {
        return data.resultImage;
      } else {
        toast.error(data.message);
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
        return null;
      }
    } catch (err) {
      console.error(`Error in generateImage: ${err}`);
      toast.error(err.response?.data?.message || "Failed to generate image");
      return null;
    }
  };
  

  useEffect(() => {
    loadCreditData();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    setshowLogin,
    showLogin,
    backendURL,
    token,
    settoken,
    credit,
    setcredit,
    loadCreditData,
    logout,
    generateImage,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
