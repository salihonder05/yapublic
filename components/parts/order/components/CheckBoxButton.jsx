"use client";
import { useEffect, useState } from "react";
import OrderSelectionCheckboxItem from "../../orderOperations/components/OrderSelectionCheckboxItem";
import OrderSelectionCheckboxList from "../../orderOperations/components/OrderSelectionCheckboxList";
const CheckBoxButton = ({ indexs, items, setAnswer, menu_name }) => {
  const [checkBox, setCheckBox] = useState([]);
  const [checkBoxData, setcheckBoxData] = useState([]);
  const [selected_id, setselected_id] = useState(0);
  const [index, setindex] = useState(indexs);
  useEffect(() => {
    setcheckBoxData(items);
  }, [items]);

  const setQuestion = async (i, index) => {
    let dt = checkBox;
    dt[index] = { id: i, checked: dt[index] ? !dt[index].checked : true };
    // await
    setCheckBox(dt);
    let answerFnc = setAnswer;
    answerFnc(i, index);
  };


  console.log("checkBoxDatacheckBoxDatacheckBoxData: " , checkBoxData);

  return (
    <div className="p-2 my-2 rounded-md bg-ya-dark-white-1">
      <span className="text-xs font-semibold">{menu_name}</span>
      {checkBoxData?.map((i, index) => (
        <li
          key={index}
          className="flex p-2 py-2 my-2 bg-white rounded-md gap-x-4"
          onClick={() => setQuestion(i.backData ? i.backData : i.id, index)}
        >
          <div className="relative flex items-center justify-between w-full">
            <div className="flex items-center h-6 p-2">
              <input
                style={{ cursor: "pointer" }}
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-ya-green focus:ring-ya-dark-green"
              />
              <div className="ml-2 text-sm leading-6">
                <label className="font-medium text-gray-900">{i?.text}</label>{" "}
              </div>
            </div>
            <>
              {i.textInfo && (
                <span
                  id="comments-description"
                  className="p-1 text-sm text-black rounded-md bg-ya-yellow"
                >
                  {i.textInfo}
                </span>
              )}
            </>
          </div>
        </li>
      ))}
    </div>
  );
};
export default CheckBoxButton;
