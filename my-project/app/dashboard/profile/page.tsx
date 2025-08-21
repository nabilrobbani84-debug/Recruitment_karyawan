// app/dashboard/profile/page.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the type for the user profile
interface UserProfileData {
  name: string;
  email: string;
  location: string;
}

const UserProfile = () => {
  const [profile, setProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    axios.get('/api/user-profile')  // Replace with actual API endpoint
      .then((response) => setProfile(response.data))
      .catch((error) => console.error('Error fetching user profile:', error));
  }, []);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>Email: {profile.email}</p>
      <p>Location: {profile.location}</p>
    </div>
  );
};

export default UserProfile;
