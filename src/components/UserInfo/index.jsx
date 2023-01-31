import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatar, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatar || "/noavatar.png"}
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>
          {new Date(additionalText).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
