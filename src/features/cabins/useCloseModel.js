import { useEffect, useRef } from "react";

function useCloseModel(handler) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick);
    },
    [handler]
  );
  return ref;
}

export default useCloseModel;
