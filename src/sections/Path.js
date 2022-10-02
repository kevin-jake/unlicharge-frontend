import React from "react";
import PathCards from "../components/PathCards";
import { MdBatteryChargingFull } from "react-icons/md";
import { RiNodeTree } from "react-icons/ri";
import { TbChartArrowsVertical } from "react-icons/tb";

const path = [
  {
    title: "Battery",
    icon: <MdBatteryChargingFull size={50} />,
    description:
      "Select type of battery here and check specification, price and how much you need",
    tooltip: "",
  },
  {
    title: "BMS",
    icon: <RiNodeTree size={50} />,
    description:
      "Select Battery Management System here to check for compatible charge and discharge current",
    tooltip: "",
  },
  {
    title: "Active Balancer",
    icon: <TbChartArrowsVertical size={50} />,
    description:
      "Select Active Balancer here to check for compatible strings for you battery",
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
