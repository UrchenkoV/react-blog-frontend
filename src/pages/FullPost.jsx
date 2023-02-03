import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { selectAuth } from "../redux/auth/slice";
import { fetchPostById, selectPost } from "../redux/post/slice";

export const FullPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector(selectAuth);
  const { fullPost } = useSelector(selectPost);
  const data = fullPost.item;
  const isLoading = fullPost.status === "loading";
  const isError = fullPost.status === "error";

  React.useEffect(() => {
    dispatch(fetchPostById(id));
  }, []);

  if (isLoading || isError) {
    return <Post isLoading={true} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.image}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={data.comments} isLoading={isLoading}>
        {user && <Index avatar={user.avatar} />}
      </CommentsBlock>
    </>
  );
};
