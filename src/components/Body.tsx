import { FC, useEffect, useState } from "react";
import { ACCESS_KEY } from "../constants";
import { Button, Spinner } from "react-bootstrap";
import RatesList from "./RatesList";
import axios from "axios";

const Body: FC = () => {
  const [flags, setFlags] = useState({ show: false, loading: true });
  const [rates, setRates] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://api.apilayer.com/fixer/latest", {
        headers: { apiKey: ACCESS_KEY },
      })
      .then((r) => {
        if (r.data.success) {
          setRates(Object.entries(r.data.rates));
        }
      })
      .catch((e) => {
        throw e.message;
      })
      .finally(() => setFlags((prev) => ({ ...prev, loading: false })));
  }, []);

  if (flags.loading) {
    return <Spinner animation={"border"} className={"d-block m-3"} />;
  }

  return (
    <div className={"p-3"}>
      <ShowRatesListButton
        show={flags.show}
        toggleShow={() => setFlags((prev) => ({ ...prev, show: !prev.show }))}
      />
      {flags.show && <RatesList {...{ rates }} />}
    </div>
  );
};

export default Body;

type propsType = {
  show: boolean;
  toggleShow: () => void;
};

const ShowRatesListButton: FC<propsType> = (props) => {
  return (
    <Button
      onClick={props.toggleShow}
      variant={props.show ? "danger" : "danger"}
      className={"mb-3"}
    >
      {(props.show ? "Скрыть" : "Показать") + " курс валют"}
    </Button>
  );
};
