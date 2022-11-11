import { createMachine, assign } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBsAJgoB2ABwBWLQGYALAEYnAJy2Lk5uADQgAJ6IALT2AY7eLlpOvvYuAVoObgC+ORFCOAQknBL0pIxCbGAATjWoNRRGADYqAGYN2BSFIiXitOWVMnIKSuaauvqWJrBmaqSWNghxnrYU3loB3m7xAVsuIRHRCC4UWptaSd62vgG+Gw55BTJFopxVmGWQrADCNWAqMCYcgAdymSBAMzmFghS3s3m86wCTnsbh8-iCIXCUVi8Iod2SoTcNx2Pk8LieIB6xTEFD+ANUFWBYBBmGUMgoAGVCKgQVIOjVsJgyEYAK7KVgAMU6wtIYuUmCIuAqkHBxlM40WiBCZ1snl8vi8bl8xNRR0Q9kCFHs9lWnnSaVylNI6Dglmpb36kiZVWmGvmWuW8LW3lCmyctlN2OOMTSnnxxJCLlsDkNAXJlI9fW6w0+A0gftmmthFuuFENWhcnnOrkd5uWBvjyM2vlsTiSl2CFPyVJevVpZSk7JYmFq9X+EEL0IWJaDvlOe08TnbfgeZpxCFbAWcaM8xPTe-ToUzfZpnHpKikoLZHO5vP5MpF4qnxdAcKSO-tATcGRc3iX0aICa8bbPYWj2HqbbzsePZZrSF6Mow17DqgL4BrOnjblk+qGnuJrZPWkbrDs4GQakWInhgrx9GhMJvriWzrGGyKRgRG4xOSvjrISaQZFkqJ5HkQA */
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
        },
        events: {} as
          | {
              type: "Create new";
            }
          | {
              type: "Form input changed";
              value: string;
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
                "Form input changed": {
                  actions: "assignFormInputToContext",
                },
              },
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
