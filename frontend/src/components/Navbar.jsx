import logo from "@/assets/logo.svg";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Cookies from 'js-cookie';  // Assuming you're using js-cookie for token management

const Navbar = () => {
  const [userData, setUserData] = useState({ email: '', username: '' });  // State to store both email and username

  const fetchUserData = async () => {
    try {
      const token = Cookies.get('userToken');  // Retrieve the token from cookies or storage
     
  
    
  
      // Fetch logged-in user data from the backend
      const res = await axiosInstance.get('/auth/logged-in-user', {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach token in Authorization header
        },
      });

      console.log('Response:', res.data.user.username);

      // Update state with the received user data
      setUserData({ username: res.data.user.username});
    } catch (error) {
      console.error('Error:', error);
      console.log(error.response ? error.response.data : 'No response data');
    }
  };

  useEffect(() => {
    fetchUserData();  // Fetch user data on component mount
  }, []);

  return (
    <nav className="bg-black py-6 px-20 flex justify-between items-center shadow sticky top-0">
      <div>
        <img src={logo} className="w-80" alt="Logo" />
      </div>
      <div className="text-gray-300 hidden md:flex gap-5 font-bold text-lg">
        <div>About Us</div>
        <div>Contact Us</div>
      </div>
      {/* Display the logged-in user's username */}
      <div className="text-white font-bold">
        {userData.username ? `Welcome, ${userData.username}` : 'Loading...'}
      </div>
    </nav>
  );
};

export default Navbar;
