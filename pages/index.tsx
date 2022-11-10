import { useMachine } from "@xstate/react";
import Head from "next/head";
import Image from "next/image";
import { myMachine } from "../machines/myFirstMachine";

const Home: NextPage = () => {
  const [state, send] = useMachine(myMachine);
  return (
    <div>
      {" "}
      <div>{JSON.stringify(state.value)}</div>
      <button
        onClick={() => {
          send("MOUSEOVER");
        }}
      >
        Mouse Over
      </button>
      <button
        onClick={() => {
          send("MOUSEOUT");
        }}
      >
        MOUSEOUT
      </button>
    </div>
  );
};

export default Home;
