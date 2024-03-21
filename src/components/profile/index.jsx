import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfileC() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/authentication/profile', {
          withCredentials: true, // Use withCredentials instead of Credential
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means it runs once on component mount

  return (
    <>
      {profileData ? (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Name: {profileData.email}</p>
          {/* Render other profile data here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
