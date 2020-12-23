import React from "react";
import ReactLoading from "react-loading";

export default function Loading(props) {
  return (
    <ReactLoading
      type={props.type}
      color={props.color}
      height={props.height}
      width={props.width}
    ></ReactLoading>
  );
}
