import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../css/NumberInput.css";

export default function NumberInput(props) {
  const [input, setInput] = useState(Number(props.value));
  const [max, setMax] = useState(Number(props.maxValue));

  useEffect(() => {
    if (input >= max) {
      setInput(max);
    }
  });

  const increase = () => {
    const value = input + 1;
    setInput(value);
    props.onChange(value);
  };

  const decrease = () => {
    const value = input - 1;
    setInput(value);
    props.onChange(value);
  };

  const onChange = (e) => {};

  return (
    <div className="">
      <div className="d-flex align-items-center justify-content-start">
        <div className="mx-2 ">
          <Button
            className="rounded-circle "
            style={{ width: 40, height: 40 }}
            onClick={decrease}
          >
            -
          </Button>
        </div>
        <div className="input ">
          <input
            type="number"
            className="input-height text-center"
            min={0}
            value={input}
            onChange={onChange}
          ></input>
        </div>
        <div className="mx-2">
          <Button
            className="rounded-circle"
            style={{ width: 40, height: 40 }}
            onClick={increase}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
