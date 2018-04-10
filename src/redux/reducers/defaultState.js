import { NOTIFS } from './notifsFixture';

const defaultValues = () => ({
  user: {
    isFetching: true
  },
  notifications: {
    entries: [],
    isFetching: true
  }
});

export default defaultValues();
