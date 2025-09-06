import { type CSSProperties } from "react";
import {  MoonLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export function Loader() {


  return (
    <div>
      <MoonLoader
        color="#d607b1"
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

