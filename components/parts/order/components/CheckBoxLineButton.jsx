"use client";
import { useEffect, useState } from "react";

const CheckBoxLineButton = ({ setAnswer, items }) => {
  const [checkBox, setCheckBox] = useState({});
  const [checkBoxData, setCheckBoxData] = useState([]);
  const [selected_id, setSelected_id] = useState(0);
  const [index, setIndex] = useState(items.index);

  useEffect(() => {
    setCheckBoxData(items);
  }, [items]);

  const setQuestion = (i, checkboxIndex) => {
    setCheckBox((prevCheckBox) => ({
      ...prevCheckBox,
      [checkboxIndex]: !prevCheckBox[checkboxIndex],
    }));

    // Call setAnswer function
    setAnswer(i, index);
  };

  return (
    <div className="p-2 rounded-md bg-ya-dark-white-1">
      <span>{items.text}</span>
      {checkBoxData?.map((i, index) => (
        <div
          style={{ cursor: "pointer" }}
          key={index + "s_chcbxln_key"}
          onClick={() => {
            setQuestion(i.backData ? i.backData : i.id, index);
          }}
        >
          <div className="my-2 bg-white rounded-md">
            <span
              style={
                checkBox[index]
                  ? {
                      color: "#787878",
                      fontFamily: "Gilroy-Bold",
                      paddingTop: 3,
                      marginLeft: 5,
                      textDecorationLine: "line-through",
                      textDecorationStyle: "solid",
                    }
                  : {
                      fontFamily: "Gilroy-Bold",
                      paddingTop: 3,
                      marginLeft: 5,
                    }
              }
            >
              {" "}
              {i.text}
            </span>
          </div>
          {i.textInfo && (
            <div>
              <div>
                <span>{i.textInfo}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckBoxLineButton;
