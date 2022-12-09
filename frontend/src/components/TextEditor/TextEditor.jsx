import React from "react";

const Editor = React.forwardRef((props, ref) => (
  <textarea
    className={props.className}
    placeholder={props.placeholder}
    ref={ref}
    defaultValue={props.defaultValue}
  ></textarea>
));

export default Editor;
