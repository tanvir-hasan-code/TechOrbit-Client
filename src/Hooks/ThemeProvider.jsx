// import React, { createContext, useEffect, useState } from "react";
// import useAuth from "./useAuth";
// import axios from "axios";

// export const ThemeContext = createContext();

// const ThemeProvider = ({ children }) => {
//   const { user, loading } = useAuth(); 
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     const fetchTheme = async () => {
//       if (!user?.email || loading) return;

//       try {
// 		  const token = await user?.accessToken;

//         const res = await axios.get(
//           `https://tech-orbit-server-sepia.vercel.app/users/settings/${user.email}`,
//           {
//             headers: {
//               authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (res.data?.theme) {
//           setTheme(res.data.theme);
//           document.documentElement.className = res.data.theme;
//         }
//       } catch (err) {
//         console.error("Theme load failed:", err.message);
//       }
//     };

//     fetchTheme();
//   }, [user, loading]);

//   useEffect(() => {
//     document.documentElement.className = theme;
//   }, [theme]);

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export default ThemeProvider;
