import React from "react";
import PathCards from "../components/PathCards";
import { MdBatteryChargingFull } from "react-icons/md";
import { RiNodeTree } from "react-icons/ri";
import { TbChartArrowsVertical } from "react-icons/tb";

const path = [
  {
    title: "Battery",
    icon: <MdBatteryChargingFull size={50} />,
    description: "asdfas asdfa sd fasd fasdf asd fasd fasdasdfasdfasdfasdfasdf",
    tooltip: "",
  },
  {
    title: "BMS",
    icon: <RiNodeTree size={50} />,
    description: "asdfas asdfa sd fasd fasdf asd fasd fasdasdfasdfasdfasdfasdf",
    tooltip: "",
  },
  {
    title: "Active Balancer",
    icon: <TbChartArrowsVertical size={50} />,
    description: "asdfas asdfa sd fasd fasdf asd fasd fasdasdfasdfasdfasdfasdf",
    tooltip: "",
  },
];

const Path = () => {
  return (
    <div className="flex-row md:flex">
      {path.map((item) => (
        <PathCards key={item.title} {...item} />
      ))}
    </div>
  );
};

export default Path;
