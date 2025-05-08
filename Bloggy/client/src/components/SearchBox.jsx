import React from "react";
import { Input } from "./ui/input";

const SearchBox = () => {
  return (
    <form>
      <Input placeholder="Search here..." className="h-9 rounded-full" />
    </form>
  );
};

export default SearchBox;
