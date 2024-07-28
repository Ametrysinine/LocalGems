import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import GemList from "./GemList";

const explore = function() {
    return (
    <>
      <h1 className="text-lg font-semibold text-blue-600 italic text-2xl p-4 ">The entire explore page component</h1>
      
      <SearchForm/>
      <GemList/>

    </>
  );
};

export default explore;
