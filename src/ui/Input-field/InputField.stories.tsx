import React, { useState } from "react";
import { InputField } from "./InputField";

export default {
  title: "Ui/InputField",
  component: InputField,
};

export const Default = () => {
  const [value, setValue] = useState("");
  return (
    <InputField
      label="First Name"
      name="firstName"
      placeholder="Enter your first name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithValue = () => {
  const [value, setValue] = useState("John");
  return (
    <InputField
      label="Last Name"
      name="lastName"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
