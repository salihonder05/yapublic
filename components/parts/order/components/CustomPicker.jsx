"use client";
import YAModal from "@/components/Modal/YAModal";
import { useEffect, useState } from "react";
import ButtonBlockPrimary from "../../buttons/ButtonBlockPrimary";

const CustomPicker = ({
  data,
  value,
  label,
  text,
  onChange,
  pickerState,
  menu_name,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedText, setSelectedText] = useState(text);

  useEffect(() => {
    setSelectedText(text);
  }, [text]);

  return (
    <div className="p-2 my-4 rounded-md bg-ya-dark-white-1">
      <span className="text-sm font-semibold">{menu_name}</span>
      <ButtonBlockPrimary
        className={`!mt-1 ${selectedText != menu_name && "!bg-ya-green"}`}
        handleOnClick={() => setOpen(true)}
      >
        {selectedText}
      </ButtonBlockPrimary>
      <YAModal open={open} setOpen={setOpen}>
        <div style={{ marginTop: 10 }}>
          {data.map((i) => {
            let values = value || null;
            let labels = label;
            return (
              <div
                key={i.id}
                // activeOpacity={1}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onChange(
                    i[values],
                    i[labels],
                    i.price ? i.price : 0,
                    i.type ? i.type : null
                  );
                  setSelectedText(i[labels]); // Seçilen metni güncelle
                  setOpen(false);
                }}
                className="p-2 py-2 my-2 rounded-md gap-x-4 bg-ya-dark-white-1 hover:bg-ya-dark-white-2"
              >
                <div className="flex items-center justify-between w-full rounded-md ">
                  <span
                    className="p-2"
                    // uppercase={true}
                    // style={[
                    //   mainStyles.textHead,
                    //   { flex: 4, ...labelStyle },
                    // ]}
                  >
                    {i[labels]}
                  </span>
                  <>
                    {i.textInfo && (
                      <div className="p-2">
                        <span className="p-2 text-white rounded-md bg-ya-yellow">
                          {i?.textInfo}
                        </span>
                      </div>
                    )}
                  </>
                </div>
              </div>
            );
          })}
        </div>
      </YAModal>
    </div>
  );
};

export default CustomPicker;
