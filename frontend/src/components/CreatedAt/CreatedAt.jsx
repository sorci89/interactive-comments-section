import React from "react";
import { formatDistanceToNow } from "date-fns";

const CreatedAt = (creationDate) => {
  const newDate = new Date(creationDate.creationDate);

  const result = formatDistanceToNow(newDate);

  return <span>{result} ago</span>;
};

export default CreatedAt;
