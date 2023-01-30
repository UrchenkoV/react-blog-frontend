import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import styles from "./Login.module.scss";
import { fetchLogin } from "../../redux/auth/slice";

export const Login = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "vlad@mail.ru",
      password: "123456",
    },
  });

  const onSubmit = async (req) => {
    const data = await dispatch(fetchLogin(req));

    if (!data.payload) {
      return setErrorMessage("Неверный логин или пароль.");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register("email", { required: "Почта обязателтна." })}
          type="email"
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          {...register("password", {
            required: "Введите пароль.",
            minLength: 6,
          })}
          error={Boolean(errors.password)}
          helperText={
            errors.password?.message ||
            (errors.password?.type === "minLength" && "Минимум 6 символов.")
          }
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};
