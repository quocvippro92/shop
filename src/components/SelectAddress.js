import React from "react";

const SelectAddress = ({ lable, options, value, setValue, type, name }) => {
  return (
    <>
      <select value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="">{`---chọn ${lable}---`}</option>
        {options?.map((item, index) => {
          return (
            <option
              key={index}
              value={
                type === "province" ? item?.province_id : item?.district_id
              }
            >
              {type === "province" ? item?.province_name : item?.district_name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectAddress;
