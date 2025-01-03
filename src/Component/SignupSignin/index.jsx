import "./style.css";
import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Header from "../Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";

const Signupsignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const Googleauth = () => {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          toast.success("User Authenticated!");
          CreateUserDocument(user);
          setLoading(false);
          navigate("/dashboard");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
          // ...
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  const Signinwithemailandpassword = () => {
    setLoading(true);
    if (password !== "" && email !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          setLoading(false);

          navigate("/dashboard");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  const Signupusingemailpassword = () => {
    setLoading(true);
    if (
      name !== "" &&
      password !== "" &&
      email !== "" &&
      confirmpassword !== ""
    ) {
      if (password === confirmpassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmpassword("");
            CreateUserDocument(user);
            console.log(user);
            setLoading(false);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);

            // ..
          });
      } else {
        toast.error("password & confirm password not matched");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  const CreateUserDocument = async (user) => {
    setLoading(true);

    if (!user) return;
    const userRef = doc(db, "user", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "user", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc Created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        v;
      }
    } else {
      toast.error("Doc already exists");
      setLoading(false);
    }
  };

  return (
    <>
      {login ? (
        <>
          <div className="signup-wrapper">
            <h2 className="title">
              Login over
              <span style={{ color: "var(--theme)" }}>Finance Tracker</span>
            </h2>
            <form>
              <Input
                label={"E-mail"}
                type={"email"}
                state={email}
                setState={setEmail}
                placeholder={"krsna@goloka.com"}
              />
              <Input
                label={"Password"}
                type={"password"}
                state={password}
                setState={setPassword}
                placeholder={"HKM#16round"}
              />

              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login Using Email & Password"}
                blue={false}
                onClick={Signinwithemailandpassword}
              />
              <p style={{ textAlign: "center" }}>or</p>
              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login Using Google"}
                blue={true}
                onClick={Googleauth}
              />
              <p className="p-login" onClick={() => setLogin(!login)}>
                {" "}
                or Dont't Have account? Click Here
              </p>
            </form>
          </div>
        </>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            SignUp over{" "}
            <span style={{ color: "var(--theme)" }}>Finace Tracker</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              type={"name"}
              state={name}
              setState={setName}
              placeholder={"Krsna D"}
            />
            <Input
              label={"E-mail"}
              type={"email"}
              state={email}
              setState={setEmail}
              placeholder={"krsna@goloka.com"}
            />
            <Input
              label={"Password"}
              type={"password"}
              state={password}
              setState={setPassword}
              placeholder={"HKM#16round"}
            />
            <Input
              label={"Confirm Password"}
              type={"password"}
              state={confirmpassword}
              setState={setConfirmpassword}
              placeholder={"HKM#16round"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "SignUP Using Email & Password"}
              blue={false}
              onClick={Signupusingemailpassword}
            />
            <p style={{ textAlign: "center" }}>or</p>
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "SignUP Using Google"}
              blue={true}
              onClick={Googleauth}
            />
            <p className="p-signup" onClick={() => setLogin(!login)}>
              {" "}
              or Dont't Have account? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Signupsignin;
