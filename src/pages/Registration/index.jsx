import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Alert } from "@mui/material";

import styles from "./Login.module.scss";
import { fetchRegister } from "../../redux/auth/slice";

export const Registration = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = React.useState();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Владислав Юрченко",
      email: "vlad2@mail.ru",
      password: "12345",
    },
  });

  const onSubmit = async (req) => {
    const data = await dispatch(fetchRegister(req));
    console.log(data);
    if (!data.payload) {
      return setErrorMessage("Не удалось зарегистрироваться.");
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
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label="Полное имя"
          error={Boolean(errors.fullName)}
          {...register("fullName", { required: "Укажите полное имя." })}
          helperText={errors.fullName?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          {...register("email", { required: "Укажите почту." })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          {...register("password", {
            required: "Укажите пароль.",
            minLength: 6,
          })}
          error={Boolean(errors.password)}
          helperText={
            errors.password?.message ||
            (errors.password?.type === "minLength" &&
              "Пароль минимум 6 символов.")
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
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
