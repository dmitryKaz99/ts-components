import { FC, memo } from "react";
import currency from "../currency.json";

type propsType = {
  shortName: string;
  value: propsType["shortName"];
};

const SymbolItemMore: FC<propsType> = (props) => {
  const alt =
    Object.entries(currency)
      .find((c) => c[1] === props.shortName)?.[0]
      .toLowerCase() ?? "ru";

  return (
    <>
      <img
        {...{ alt }}
        src={"https://flagcdn.com/16x12/" + alt + ".png"}
        width={16}
        height={12}
        className={"me-3"}
      />
      <span>{props.value}</span>
    </>
  );
};

export default memo(SymbolItemMore);
