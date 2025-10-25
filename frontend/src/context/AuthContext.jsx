import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // Fetch user role from backend if logged in
      if (currentUser?.email) {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/role/${currentUser.email}`);
          setUserRole(response.data.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("citizen"); // Default role
        }
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
