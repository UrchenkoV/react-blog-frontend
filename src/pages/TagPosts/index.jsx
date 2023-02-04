import { Alert, Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Post } from "../../components";
import { selectAuth } from "../../redux/auth/slice";
import { fetchPostsByTag, selectPost } from "../../redux/post/slice";

import styles from "./TagPosts.module.scss";

export const TagPosts = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { user } = useSelector(selectAuth);
  const { post } = useSelector(selectPost);
  const isLoading = post.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPostsByTag(slug));
  }, []);

  return (
    <>
      <div className={styles.root}>
        <h2 className={styles.title}># {slug}</h2>
      </div>

      {post.status === "error" ? (
        <Alert severity="error">Не удалось получить статьи.</Alert>
      ) : (
        <Grid container spacing={2}>
          {isLoading
            ? [...new Array(4)].map((_, i) => (
                <Grid key={i} item xs={6}>
                  <Post isLoading={isLoading} />
                </Grid>
              ))
            : post.items.map((obj) => (
                <Grid key={obj._id} item xs={6}>
                  <Post
                    id={obj._id}
                    title={obj.title}
                    imageUrl={obj.image}
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={obj.commentCount}
                    tags={obj.tags}
                    isEditable={obj.user._id === user?._id}
                  />
                </Grid>
              ))}
        </Grid>
      )}
    </>
  );
};
