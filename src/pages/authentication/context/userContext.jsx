import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Retrieve the data from local storage
    const userDataString = localStorage.getItem("userData");
    // Convert the string back to an object
    const userData = JSON.parse(userDataString);
    
    // Update currentUser only if userData is not null
    if (userData) {
      setCurrentUser(userData);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
