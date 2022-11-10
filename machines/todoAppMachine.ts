import { createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxM6rJgDa0SQBtAAwBdRKAAOnYgBdiqUuJAAPRAEYATAA4KAFl1a1htQFYNAZl3mA7CYA0IAJ6IAtGqMU11gJy+NANltrQw0TAF8whw4cAhJyaj4GJnROVho6JJkUrgAzXGJuQVElKVhZeUUkFVdTIQpvc3czSxt7J1d-PQ0rfw0jAK8jWwjIkFJ0OCVovCIySnT6UkYOeCrS8oUlVQQ3NXMKazUhfwbzEwbbB2cd9x0vX28AoJDw0enYuYoVzAXIEuk5JsqtsjvtetZ-FoTCZdJDLu0EOYdI1eiZzP5ekcLq8oikYrN4gtMtlMGAAE5k1Bkv5rAEVLY1LQ6LQaCxaCHeNGaNrXBoHExGfymays-wmXoRXEYfFxMD-MqAyqgbYuCydFlsjlc0JXVwaITWTw+PyBEzBbkjMJAA */
  createMachine({
    initial: "Loading Todos",
    states: {
      "Loading Todos": {
        on: {
          "Todos loaded": {
            target: "Todos Loaded",
          },
          "Loading todos failed": {
            target: "Loading todos errored",
          },
        },
      },
      "Todos Loaded": {},
      "Loading todos errored": {},
    },
    id: "Todo machine",
  });
