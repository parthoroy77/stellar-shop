import { createAppStore } from "@repo/redux/store";

export const store = createAppStore({});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
