import { useMachine } from "@xstate/react";
import Head from "next/head";
import Image from "next/image";
import { todosMachine } from "../machines/todoAppMachine";

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        throw new Error("ERROR");
        return ["take trash out!", "do laundry"];
      },
    },
  });
  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
    </div>
  );
};

export default Home;
