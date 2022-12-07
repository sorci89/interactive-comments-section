import { render, screen, fireEvent } from "@testing-library/react";
import CommentCard, { Button, Editor } from "./CommentCard";

const comment = [];
const currentUser = [];
const deleteElement = [];
const setIsOpen = false;
const setActiveElement = [];
const activeElement = [];
const updateComment = [];

test("it renders CommentCard component without crashing", () => {
  render(
    <CommentCard
      comment={comment}
      currentUser={currentUser}
      deleteElement={deleteElement}
      setIsOpen={setIsOpen}
      setActiveElement={setActiveElement}
      activeElement={activeElement}
      updateComment={updateComment}
    />
  );
});
