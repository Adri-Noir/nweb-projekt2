import React, { useMemo } from "react";
import styles from "../styles/XSS.module.css";
import CommentsList from "@/components/CommentsList";

export interface CommentType {
  id: number;
  comment: string;
}

const comments: CommentType[] = [
  {
    id: 1,
    comment: "This is a comment!",
  },
  {
    id: 2,
    comment: "This is another comment!",
  },
];

const XSS = () => {
  const [commentList, setCommentList] = React.useState<CommentType[]>(comments);
  const [comment, setComment] = React.useState<string>("");
  const [xssPrevention, setXssPrevention] = React.useState<boolean>(true);
  const onCommentSubmit = () => {
    const newComment = {
      id: commentList.length + 1,
      comment,
    };

    setCommentList([...commentList, newComment]);
  };

  const reversedCommentList = useMemo(
    () => [...commentList].reverse(),
    [commentList],
  );

  return (
    <div className={styles.xssContainer}>
      <div className={styles.xssFormContainer}>
        <h3>Write a comment!</h3>
        <textarea
          className={styles.xssFormTextArea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className={styles.xssFormButton} onClick={onCommentSubmit}>
          Submit
        </button>
        <label htmlFor={"xssPrevention"}>XSS Prevention</label>
        <input
          name={"xssPrevention"}
          type={"checkbox"}
          onChange={() => setXssPrevention(!xssPrevention)}
          checked={xssPrevention}
        />
      </div>
      <div className={"divider"} />
      <CommentsList
        comments={reversedCommentList}
        xssPrevention={xssPrevention}
      />
    </div>
  );
};

export default XSS;
