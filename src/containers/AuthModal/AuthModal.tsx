import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseApp";
import { setUser } from "../../store/authSlice";
import { useCreateUserProfileMutation } from "../../apis/firebaseApi";
import "./AuthModal.css";

export const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const [createUserProfile] = useCreateUserProfileMutation();

  const handleSocialSignIn = async (providerName: "google" | "apple") => {
    try {
      const provider =
        providerName === "google"
          ? new GoogleAuthProvider()
          : new OAuthProvider("apple.com");

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const additionalInfo = getAdditionalUserInfo(result);
      const isNew = additionalInfo?.isNewUser;

      if (isNew) {
        await createUserProfile({
          uid: user.uid,
          email: user.email!,
          username: user.displayName ?? "",
        });
      }

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email!,
          username: user.displayName ?? "",
          isAuthenticated: true,
        })
      );
      toast.success(
        `Logged in with ${providerName === "google" ? "Google" : "Apple"}!`
      );
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(`${providerName} sign-in failed.`);
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal__overlay" onClick={onClose}></div>
      <div className="auth-modal__content">
        <button className="auth-modal__close" onClick={onClose}>
          ×
        </button>
        <div className="auth-modal__welcoming-banner">
          <h2 className="auth-modal__title">Welcome</h2>
          <img src="/assets/icons/jamila-logo.png" alt="" width={150} />
        </div>
        <div className="auth-modal__buttons">
          <button
            className="social-btn"
            onClick={() => handleSocialSignIn("google")}
          >
            <img src={`/assets/icons/google.png`} alt="google" width={19} />
            <span>Sign in with Google</span>
          </button>
          <button
            className="social-btn"
            onClick={() => handleSocialSignIn("google")}
          >
            <img src={`/assets/icons/apple.png`} alt="apple" width={19} />
            <span>Sign in with Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
};
