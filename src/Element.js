import React, { useEffect, useRef } from "react";
import { fromEvent } from "rxjs";
import { merge, debounceTime } from "rxjs/operators";

const Element = () => {
  const elRef = useRef();
  useEffect(() => {
    const elClick$ = fromEvent(elRef.current, "click");
    elClick$.subscribe((e) => console.log(e.type));

    const elMouseOut$ = fromEvent(elRef.current, "mouseout");

    const elMouseOver$ = fromEvent(elRef.current, "mouseover");
    elMouseOver$
      .pipe(merge(elMouseOut$), debounceTime(1500))
      .subscribe((e) => console.log(`subscribe`, e?.type));
  }, []);

  return (
    <div
      ref={elRef}
      style={{
        backgroundColor: "blue",
        width: "300px",
        height: "300px",
        margin: "0 auto"
      }}
    ></div>
  );
};

export default Element;
