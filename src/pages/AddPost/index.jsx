import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Link, useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectAuth } from "../../redux/auth/slice";
import axios from "../../axios";
import { Alert } from "@mui/material";

export const AddPost = () => {
  const { isAuth } = useSelector(selectAuth);
  const navigate = useNavigate();
  const { id } = useParams();

  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const inputFileRef = React.useRef(null);

  const isEditing = id;

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setTags(data.tags.join(", "));
          setText(data.text);
          setImageUrl(data.image);
        })
        .catch((err) => {
          console.log(err);
          alert("Ошибка при получении статьи.");
        });
    }
  }, []);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Не удалось загружить изображение.");
    }
  };

  const [isRemoveImage, setIsRemoveImage] = React.useState(false);
  const [messageRemoveImage, setMessageRemoveImage] = React.useState("");
  const [errRemoveImage, setErrRemoveImage] = React.useState("");

  const onClickRemoveImage = async () => {
    try {
      setIsRemoveImage(true);
      const { data } = await axios.patch(`/posts/${id}/destroy-image`);

      setMessageRemoveImage(data.message);
      setImageUrl("");
    } catch (error) {
      console.warn(error);
      setErrRemoveImage(error.response.data.message);
    }
    setIsRemoveImage(false);

    setTimeout(() => {
      setMessageRemoveImage("");
      setErrRemoveImage("");
    }, 5000);
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        text,
        tags: tags
          .split(",")
          .map((item) => item.trim())
          .filter((i) => i !== ""),
        image: imageUrl,
      };
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("posts", fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (error) {
      console.warn(error);
      alert("Не удалось соранить.");
    }
    setIsLoading(false);
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Paper style={{ padding: 30 }} elevation={0}>
      {!imageUrl && (
        <>
          <Button
            onClick={() => inputFileRef.current.click()}
            variant="outlined"
            size="large"
          >
            Загрузить превью
          </Button>
          <input
            ref={inputFileRef}
            type="file"
            onChange={handleChangeFile}
            hidden
          />
        </>
      )}

      {messageRemoveImage && (
        <Alert severity="success">{messageRemoveImage}</Alert>
      )}
      {errRemoveImage && <Alert severity="error">{errRemoveImage}</Alert>}

      {imageUrl && (
        <div className={styles.preview}>
          <img
            className={styles.image}
            src={`http://localhost:5000${imageUrl}`}
            alt="Uploaded"
          />
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
            disabled={isRemoveImage}
          >
            Удалить
          </Button>
        </div>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        onChange={(e) => setTags(e.target.value)}
        value={tags}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          disabled={!title}
          onClick={onSubmit}
          size="large"
          variant="contained"
        >
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>

        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
