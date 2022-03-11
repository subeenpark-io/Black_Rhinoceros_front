import { Elements } from 'react-flow-renderer';

interface Users {
  user1: Elements;
  user2: Elements;
  user3: Elements;
}

export interface GlobalState {
  users: Users;
  currentUser: string;
  loading: boolean;
  error: Error | null;
}
