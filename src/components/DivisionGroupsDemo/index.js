// export * from "./DivisionGroupsDemo";
"use client"; // added because of a bug in Next
import dynamic from "next/dynamic";

const DivisionGroupsDemo = dynamic(
    () => import("./DivisionGroupsDemo")
);

export default DivisionGroupsDemo;
