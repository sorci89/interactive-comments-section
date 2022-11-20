import { render, screen, fireEvent } from "@testing-library/react";
import Score from "./Score";

const comment = [];
const updateComment = (newComment) => {
  return newComment;
};
const disabled = [];
const handleClick = jest.fn(updateComment);

test("it renders Score component without crashing", () => {
  render(
    <Score comment={comment} disabled={disabled} updateComment={handleClick} />
  );
});

test("it renders 2 buttons without crashing", () => {
  render(
    <Score comment={comment} disabled={disabled} updateComment={handleClick} />
  );
  const buttonElements = screen.getAllByRole("button");

  expect(buttonElements).toBeDefined();
  expect(buttonElements).toHaveLength(2);
});

// fireEvent.click(buttonElement);
// expect(handleClick).toHaveBeenCalledTimes(1);
// expect(handleClick.mock.results[0].value).toBe("id");

test("it renders upscore button correctly", () => {
  render(
    <Score comment={comment} disabled={disabled} updateComment={handleClick} />
  );
  const buttonElement = screen.getByText("+");
  expect(buttonElement).toBeDefined();
});

test("it renders downscore button correctly", () => {
  render(
    <Score comment={comment} disabled={disabled} updateComment={handleClick} />
  );
  const buttonElement = screen.getByText("-");
  expect(buttonElement).toBeDefined();
});

test("it does not fire click event when button is disabled", () => {
  const handleClick = jest.fn(updateComment);
  const disabled = true;
  const isActiveButton = false;
  render(
    <Score comment={comment} disabled={disabled} updateComment={handleClick} />
  );

  fireEvent.click(screen.getByText("+"));
  expect(handleClick.mock.results.length).toEqual(0);

  fireEvent.click(screen.getByText("-"));
  expect(handleClick.mock.results.length).toEqual(0);
});

test("it fires click event when button is not disabled", () => {
  const handleClick = jest.fn(updateComment);
  const disabled = false;
  const isActiveButton = false;
  render(
    <Score comment={comment} disabled={disabled} updateComment={handleClick} />
  );

  fireEvent.click(screen.getByText("+"));
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick.mock.results.length).toEqual(1);
});

test("it doesn't fire click event when upscore button was clicked once before", () => {
  const handleClick = jest.fn(updateComment);
  const disabled = false;
  const isActiveButton = false;
  render(
    <Score comment={comment} disabled={disabled} updateComment={handleClick} />
  );

  fireEvent.click(screen.getByText("+"));
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick.mock.results.length).toEqual(1);

  fireEvent.click(screen.getByText("+"));
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick.mock.results.length).toEqual(1);
});

test("it doesn't fire click event when downscore button was clicked once before", () => {
  const handleClick = jest.fn(updateComment);
  const disabled = false;
  const isActiveButton = false;
  render(
    <Score comment={comment} disabled={disabled} updateComment={handleClick} />
  );

  fireEvent.click(screen.getByText("-"));
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick.mock.results.length).toEqual(1);

  fireEvent.click(screen.getByText("-"));
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick.mock.results.length).toEqual(1);
});

test("it fires click event on downscore button when up score button was clicked before", () => {
  const handleClick = jest.fn(updateComment);
  const disabled = false;
  const isActiveButton = false;
  render(
    <Score comment={comment} disabled={disabled} updateComment={handleClick} />
  );

  fireEvent.click(screen.getByText("+"));
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick.mock.results.length).toEqual(1);

  fireEvent.click(screen.getByText("-"));
  expect(handleClick).toHaveBeenCalledTimes(2);
  expect(handleClick.mock.results.length).toEqual(2);
});

test("it fires click event on upscore button when down score button was clicked before", () => {
  const handleClick = jest.fn(updateComment);
  const disabled = false;
  const isActiveButton = false;
  render(
    <Score comment={comment} disabled={disabled} updateComment={handleClick} />
  );

  fireEvent.click(screen.getByText("-"));
  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick.mock.results.length).toEqual(1);

  fireEvent.click(screen.getByText("+"));
  expect(handleClick).toHaveBeenCalledTimes(2);
  expect(handleClick.mock.results.length).toEqual(2);
});

test("it displays comment's score correctly", () => {
  const comment = {
    score: "15",
  };
  render(
    <Score comment={comment} disabled={disabled} updateComment={handleClick} />
  );
  const scoreDisplayElement = screen.getByText(comment.score);

  expect(scoreDisplayElement.textContent).toBe("15");
});
