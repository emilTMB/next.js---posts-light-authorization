import Login from "./components/login";
import styles from "./page.module.scss";

const LoginPage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Авторизируйтесь</h1>
        <p>логин: user1 <br/> пароль: password1</p>
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
