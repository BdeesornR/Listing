import React from "react";
import "./DelCharButton.css";

const CharComp = (props) => {
  const sentence = props.material;
  let stringChar = sentence.split("");

  const deleteElement = (num) => {
    const tempStringArray = [...stringChar];
    tempStringArray.splice(num, 1);
    stringChar = tempStringArray;
    const mergeString = stringChar.join("");
    props.func(mergeString);
    console.log(num);
  };

  const charBox = stringChar.map((rawData, index) => (
    <div
      key={index}
      style={
        rawData === " "
          ? { width: "18px", cursor: "pointer" }
          : { cursor: "pointer" }
      }
      onClick={() => deleteElement(index)}
    >
      {rawData}
    </div>
  ));

  return <div className="name_display">{charBox}</div>;
};

export default CharComp;
