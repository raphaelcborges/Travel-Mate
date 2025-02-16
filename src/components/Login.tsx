import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

interface LoginProps {
  onLogin: (userId: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin(userCredential.user.uid);
    } catch (err) {
      setError("Failed to login. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? "Sign Up" : "Login"}</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleAuth} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                 placeholder="Email" className="w-full p-2 border rounded"/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                 placeholder="Password" className="w-full p-2 border rounded"/>
          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <button onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-pink-500 mt-2 block text-center">
          {isSignUp ? "Already have an account? Log in" : "Create an account"}
        </button>
      </div>
    </div>
  );
}

export default Login;
