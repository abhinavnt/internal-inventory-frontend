import React, { useState } from "react";
import { TextareaField } from "./TextareaField";

export default {
  title: "Ui/TextareaField",
  component: TextareaField,
};

export const Default = () => {
  const [value, setValue] = useState("");
  return <TextareaField label="Message" placeholder="Write your message here" value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const WithValue = () => {
  const [value, setValue] = useState("Hello, this is a prefilled message!");
  return <TextareaField label="Message" value={value} onChange={(e) => setValue(e.target.value)} />;
};
