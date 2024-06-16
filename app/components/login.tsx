"use client";
import { useState } from "react";
import { login } from "../components/lib/auth";
import { useStore } from "@nanostores/react";
import { isAuthenticated, user } from "../components/store/auth";
import Link from "next/link";
import styles from "./login.module.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isAuth = useStore(isAuthenticated);
  const currentUser = useStore(user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login(username, password);

    if (success) {
      isAuthenticated.set(true);
      user.set({ id: 1, username });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className={styles.user__form} htmlFor="username">
          Username
        </label>
        <input
          className={styles.user__form}
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className={styles.user__form} htmlFor="password">
          Password
        </label>
        <input
          className={styles.user__form}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.btn__submit} type="submit">
          Login
        </button>
      </form>
      {isAuth && <Link className={styles.user__form__auth} href="/blog">К просмотру постов!</Link>}
    </>
  );
};

export default Login;
