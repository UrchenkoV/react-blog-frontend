import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPost, fetchTags } from "../redux/post/slice";

export const Home = () => {
  const dispatch = useDispatch();
  const { post, tag } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const [tabs, setTabs] = React.useState(["Новые", "Популярные"]);
  const [tabActiveIndex, setTabsActiveIndex] = React.useState(0);

  const isLoading = post.status === "loading";
  const isTagLoading = post.status === "loading";

  React.useEffect(() => {
    console.log(11111);
    dispatch(fetchPost());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={tabActiveIndex}
        aria-label="basic tabs example"
      >
        {tabs.map((item, i) => (
          <Tab key={i} label={item} onClick={() => setTabsActiveIndex(i)} />
        ))}
      </Tabs>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isLoading ? [...Array(5)] : post.items).map((obj, i) =>
            isLoading ? (
              <Post key={i} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.image}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={obj.user._id === user?._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tag.items} isLoading={isTagLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Иван Иванов",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
