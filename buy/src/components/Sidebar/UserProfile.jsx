import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.displayName) {
          updateProfile(user, { displayName: "Guest User" })
            .then(() => setUser({ ...user, displayName: "Guest User" }))
            .catch((error) => console.error("Error updating profile", error));
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Photo:</strong></p>
      {user.photoURL ? <img src={user.photoURL} alt="User" width="100" /> : <p>No photo available</p>}
    </div>
  );
};

export default UserProfile;
