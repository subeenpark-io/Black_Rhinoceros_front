import { configureAppStore } from 'store/configureStore';

const store = configureAppStore();

export type AppDispatch = typeof store.dispatch;
