import React from "react";
import PathCards from "../components/PathCards";
import { MdBatteryChargingFull } from "react-icons/md";
import { RiNodeTree } from "react-icons/ri";
import { TbChartArrowsVertical } from "react-icons/tb";

const path = [
  {
    title: "Battery",
    icon: <MdBatteryChargingFull size={50} />,
    description: "",
    tooltip: "",
  },
  {
    title: "BMS",
    icon: <RiNodeTree size={50} />,
    description: "",
    tooltip: "",
  },
  {
    title: "Active Balancer",
    icon: <TbChartArrowsVertical size={50} />,
    description: "",
    tooltip: "",
  },
];

const Path = () => {
  return (
    <div className="flex">
      {path.map((item) => (
        <PathCards {...item} />
      ))}
    </div>
  );
};

export default Path;
