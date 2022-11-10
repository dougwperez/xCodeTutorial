import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogCMAVgDsFW44AsbgMwAON44Bs9v4ATPYANCAAnogAtO4UwbYAnG72yVpuwUn+3t4AvnkRQjgEJJwS9KSMQmxgAE51qHUURgA2KgBmTdgUxSJl4rSV1TJyCkrmmrr6liawZmqkljYIMbZanhT+qRnejlrB-raejhHRCMcUjt72SZ4ebt7Bmba5BYUgpOhwln2lYtQhlIarNTJNlrFbJdHOt-HdPLcTuEopDXi5HElMYdHE5vLZQgUijISqJODVMBVIKD5uCkNZED57Fsca4tN4kr4kWdYvFEik0kkMlkcvkPn9SYNJFVMMpRph6o06lS6XMFhY6StPD4KLk0p5Xgi7jjuQhnhQtGl7B5Xvz9QSxcT+mJqWqlhrIUcrrD4YjjSjVsEtM5XJiktjcfj7O88kA */
  createMachine(
    {
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      schema: {
        // events: {} as
        //   | { type: "Todos loaded"; todos: string[] }
        //   | { type: "Loading todos failed"; errorMessage: string },
        services: {} as {
          loadTodos: {
            data: string[];
          };
        },
      },
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
      },
      id: "Todo machine",
      initial: "Loading Todos",
      states: {
        "Loading Todos": {
          invoke: {
            src: "loadTodos",
            onDone: [
              {
                target: "Todos Loaded",
                actions: "assignTodosToContext",
              },
            ],
            onError: [
              {
                target: "Loading todos errored",
                actions: "assignErrorToContext",
              },
            ],
          },
        },
        "Todos Loaded": {},
        "Loading todos errored": {},
      },
    },
    {
      actions: {
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
          };
        }),
        assignErrorToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          };
        }),
      },
    }
  );
