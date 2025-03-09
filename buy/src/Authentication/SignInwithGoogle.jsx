import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Use React Router for navigation
import googleLogo from "../assets/Images/google.jpg"; // Correct image import

function SignInwithGoogle() {
  const navigate = useNavigate(); // Hook for navigation

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          lastName: "", // Google does not provide last name separately
          photo: user.photoURL,
        });

        console.log("Google Sign-In Successful");
        navigate("/profile"); // Navigate without full reload
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  }

  return (
    <div>
      <p className="continue-p">-- Or continue with --</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={googleLogo} alt="Google Logo" width="40px" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
