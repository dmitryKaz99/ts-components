import { FC, memo, useEffect, useState } from "react";
import { ACCESS_KEY } from "../constants";
import { Spinner } from "react-bootstrap";
import SymbolItem from "./SymbolItem";
import axios from "axios";

type propsType = {
  rates: any[];
};

const RatesList: FC<propsType> = (props) => {
  const [hasLoading, setHasLoading] = useState(true);
  const [symbols, setSymbols] = useState<
    Array<{
      name: string;
      shortName: string;
      value: string;
    }>
  >();

  useEffect(() => {
    axios
      .get("https://api.apilayer.com/fixer/symbols", {
        headers: { apiKey: ACCESS_KEY },
      })
      .then((r) => {
        if (r.data.success) {
          const result = props.rates.map((rate) => ({
            name: r.data.symbols[rate[0]] ?? rate[0],
            shortName: rate[0],
            value: rate[1],
          }));
          setSymbols(result);
        }
      })
      .catch((e) => {
        throw e.message;
      })
      .finally(() => {
        setHasLoading(false);
      });
  }, []);

  if (hasLoading) {
    return <Spinner animation={"border"} className={"d-block"} />;
  }

  return (
    <>
      {(symbols || []).map((s) => {
        return <SymbolItem {...s} />;
      })}
    </>
  );
};

export default memo(RatesList);
