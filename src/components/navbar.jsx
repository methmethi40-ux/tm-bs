import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import "../styles/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("✅ Signed in!");
    } catch (error) {
      console.error("Sign-in failed:", error);
      alert("Sign-in failed. Please check console for details.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("✅ Signed out!");
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="/logo192.png"
          alt="TMBS Logo"
          className="navbar-logo-img"
        />
        <h1 className="navbar-title">T-M-B-S Producers</h1>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search videos, images, or articles..."
          className="navbar-search-input"
        />
      </div>

      <div className="navbar-actions">
        {user ? (
          <>
            <div className="user-info">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="user-avatar"
              />
              <span className="user-name">{user.displayName}</span>
            </div>
            <button className="signin-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="signin-btn" onClick={handleSignIn}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
