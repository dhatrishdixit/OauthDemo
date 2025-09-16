import { type CSSProperties } from "react";
import { BarLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export function Loader() {
  return (
    <div className="bg-gray-900 dark:bg-gray-900 h-screen w-screen flex items-center justify-center">
      <BarLoader
        color="#8b5cf6"  // A nice purple (Tailwind Indigo-500) that looks good on dark background
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
