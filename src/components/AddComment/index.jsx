import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from "../../axios";
import { upadateFullPostOnAddComment } from "../../redux/post/slice";
import { Alert } from "@mui/material";

export const Index = ({
  avatar = "https://mui.com/static/images/avatar/5.jpg",
}) => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = React.useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    resetField,
  } = useForm({ defaultValues: { text: "" } });

  const onSubmit = async (req) => {
    try {
      setErrorMessage("");
      const { data } = await axios.post(`/posts/${id}/comment`, req);

      resetField("text");
      dispatch(upadateFullPostOnAddComment(data));
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      {errorMessage && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {errorMessage}
        </Alert>
      )}

      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={avatar} />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div>
            <TextField
              label="Написать комментарий"
              fullWidth
              {...register("text", { required: "Напишите комментарий." })}
              error={Boolean(errors.text)}
              helperText={errors.text?.message}
              variant="outlined"
              maxRows={10}
              multiline
            />
            <Button type="submit" disabled={!isValid} variant="contained">
              Отправить
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
