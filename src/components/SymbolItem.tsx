import { FC, memo, useState } from "react";
import SymbolItemMore from "./SymbolItemMore";

type propsType = {
  name: string;
  shortName: propsType["name"];
  value: propsType["name"];
};

const SymbolItem: FC<propsType> = (props) => {
  const [hasMore, setHasMore] = useState(false);

  return (
    <div>
      <a
        className={"me-3"}
        style={{ cursor: "pointer" }}
        onClick={(req) => setHasMore((prev) => !prev)}
      >
        {props.name}
      </a>
      {hasMore && (
        <SymbolItemMore shortName={props.shortName} value={props.value} />
      )}
    </div>
  );
};

export default memo(SymbolItem);
