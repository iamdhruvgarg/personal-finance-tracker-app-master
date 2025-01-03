import { useNavigate } from "react-router-dom";
import "./style.css";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import userImg from "../../assets/user.svg";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logout() {
    try {
      signOut(auth)
        .then(() => {
          navigate("/");
          toast.success("Signed Out Successfully ");
          // Sign-out successful.
        })
        .catch((error) => {
          toast.error(error.message);
          // An error happened.
        });
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className="navbar">
      <p className="logo">Personal Finance Tracker</p>

      <div className="profilepic">
        {user && (
          <>
            <img
              src={user.photoURL ? user.photoURL : userImg}
              style={{ borderRadius: "50%", height: "1.5rem", widt: "1.5rem" }}
            />
            <p className="logo link" onClick={logout}>
              {" "}
              Logout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
