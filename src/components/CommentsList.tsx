import React, { memo } from "react";
import { CommentType } from "@/components/XSS";
import styles from "../styles/CommentsList.module.css";

interface CommentsListProps {
  comments: CommentType[];
  xssPrevention: boolean;
}

const CommentsList = ({ comments, xssPrevention }: CommentsListProps) => {
  return (
    <div className={styles.commentsListContainer}>
      <h3>Comments</h3>
      <div className={styles.commentsList}>
        {comments.map((comment) => {
          if (xssPrevention) {
            return (
              <React.Fragment key={comment.id}>
                <div className={styles.comment}>{comment.comment}</div>
              </React.Fragment>
            );
          }

          // because React doesn't execute script tags after the initial render
          if (comment.comment.includes("<script")) {
            const scriptContentList = comment.comment.match(
              /<script\b[^>]*>([\s\S]*?)<\/script>/,
            );

            const scriptContent = scriptContentList?.filter((content) => {
              return !content.includes("<script");
            });

            scriptContent?.forEach((content) => {
              eval(content);
            });
          }

          return (
            <React.Fragment key={comment.id}>
              <div
                className={styles.comment}
                dangerouslySetInnerHTML={{ __html: comment.comment }}
              ></div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default memo(CommentsList);
