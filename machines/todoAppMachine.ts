import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBsAFgoBOAKz2nTgOyeAzAA57HwAmP08AGhAAT0QAWn8gimD7LQBGNPsXJ1tbHwBfXIihHAISTgl6UkYhNjAAJ1rUWoojABsVADNG7AoikVLxWgqqmTkFJXNNXX1LE1gzNVJLGwQ4rU8KFK0XIKCnIJcUp0CXcKjYpwpt222tJxSXPyDso-zCmWLRTmrMcshWABEwC0wMowNMkCBZvMLBDlj5-BQ1j4tD5XNdjj4XBFoitdj5LgEAt4Dpk-H5XiBeiUxD0Rj9Bn8AMK1MAqMCYcgAd3BxlMEyWiBSQRSG3s3jJaW2GV82NitgSKNCe3u8uOtgpVM+lGZrNUlQ5YE5mGUMgoAGVCKhOVJOrVsJgyEYAK7KVhmp0AI2wZh5kL5CwFCB2tgowpSyKCnnsyTFfh8soQ4fWnkO8runjjoTjGvefRpOpUUi5xtNFqtNq6DtIztdADFK46XZgiLhKpBfVD+bDYkEtKGAi5bOGfJ4tH4tFoggnIwkspshYPhT4UuSCpTc9TOAW9YxiyaMObcNwpPvUOx1JQFAJaRgPv0KNui4aSwezUeTzJ5KReOMFvoO-6MKgMsQSYokLgHDOKT2GSI72AmMRPBQcb7L2qZZH4bguDmt55luLKFvqe6lu++qnqwdQNE0rQdF0N7CJu2oETuBpGqeh7HmRn5jIW6j-roMyAYs3YIMuFzKn4Hi2J4DzCkE8FnEGISIlk0kYTJOEMVqFCAsCLHkRwl7fvwggbtpukgh+GBfj+vGTHoAkQp2AYiYh47OCmmxKiuPj2FOikxIECR+X5YbQX4qrqmumr3hZ+kyBR9SNM0bTKLa3QxTScVWagNmKHZ-EGE5QmBi4k79pGo4pLYTgoqkCHwustwTlmtXyth0VmfeEBApZXG3pRjR-GaRhgJAmBOkYAFzF2wGICOIo+NJ4b2EOY5Kgh9z4suqFeMu9grmsml3jSPV6TlmCDSyECsFYsDKGyFC4O0oK1AAFPsE4AJSsJlnBnX1jCnpdSXXdN0LCXNokZIiIVJqBKaeLYCHuU8vjwk4AQjh1a6kOgcCWH9AySPq1SCTNLlQ6s+KQSEmSBFoQVYgFKSeAk4ZPE4yJrK4nhc8deGmSw9J0JA5MQ4GaQJCmfibFoQ5Sic8Ys6EFCBDV6sjqBXNBALjHUIMOWwCDVFi8VFNAdYsTIn4KlRtVMmHMcpw4guiTyqi8uuNrGZ69pj5Ec+7Flta+rpVWNbi7NVtBusDgwS4-iBAdkbwgm0F9onknJEKTy9hBfv3gHu5ByRnFAzIUeUzHGT4g4RwZ+16dlWramDm4uy2KEHVvLh+vF6xL6oFXlvLDEXf9hkQ6NWOE7+TiMEUCmWS7KzmYZr5hdZb18UYCPkM12KzhlYcicLghMHJmK4YrUji49+uffaQDu9YFdZu8hbB-LCcjjL3ith5aJ3qizQ4atxyM3uCiNq+wt7kH3oGOIg47YHWkgcI4mIXaxBOCGKMKZly+TvvKfI+QgA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: "",
      },
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      schema: {
        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
            data: void;
          };
          deleteTodo: {
            data: void;
          };
        },
        events: {} as
          | {
              type: "Create new";
            }
          | {
              type: "Form input changed";
              value: string;
            }
          | {
              type: "Submit";
            }
          | {
              type: "Delete";
              todo: string;
            },
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
        "Todos Loaded": {
          on: {
            Delete: {
              target: "Deleting todo",
            },
            "Create new": {
              target: "Creating new todo",
            },
          },
        },
        "Loading todos errored": {},
        "Creating new todo": {
          initial: "Showing form input",
          states: {
            "Showing form input": {
              on: {
                Submit: {
                  target: "Saving todo",
                },
                "Form input changed": {
                  actions: "assignFormInputToContext",
                },
              },
            },
            "Saving todo": {
              invoke: {
                src: "saveTodo",
                onDone: [
                  {
                    target: "#Todo machine.Loading Todos",
                  },
                ],
                onError: [
                  {
                    target: "Showing form input",
                    actions: "assignErrorToContext",
                  },
                ],
              },
            },
          },
        },
        "Deleting todo": {
          invoke: {
            src: "deleteTodo",
            onDone: [
              {
                target: "Loading Todos",
              },
            ],
            onError: [
              {
                target: "deleting todo errored",
                actions: "assignErrorToContext",
              },
            ],
          },
        },
        "deleting todo errored": {
          after: {
            "2500": {
              target: "#Todo machine.Todos Loaded",
              actions: [],
              internal: false,
            },
          },
          on: {
            "Speed up": {
              target: "Todos Loaded",
            },
          },
        },
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
        assignFormInputToContext: assign((context, event) => {
          return {
            createNewTodoFormInput: event.value,
          };
        }),
      },
    }
  );
