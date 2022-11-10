import { useMachine } from "@xstate/react";
import Head from "next/head";
import Image from "next/image";
import { todosMachine } from "../machines/todoAppMachine";

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine);
  return (
    <div>
      {" "}
      <div>{JSON.stringify(state.value)}</div>
      <button
        onClick={() => {
          send("Todos loaded");
        }}
      >
        Todos Loaded
      </button>
      <button
        onClick={() => {
          send("Loading todos failed");
        }}
      >
        Loading Todos Failed
      </button>
    </div>
  );
};

export default Home;
