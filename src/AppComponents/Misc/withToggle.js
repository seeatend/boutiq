import { compose, withReducer, withHandlers } from 'recompose';

export default withToggle = compose(
  withReducer('toggleOn', 'dispatch', (state, action) => {
    switch (action.type) {
      case 'SHOW':
        return true;
      case 'HIDE':
        return false;
      case 'TOGGLE':
        return !state;
      default:
        return state;

    }
  }, false),
  withHandlers({
    show: ({ dispatch }) => e => dispatch({ type: 'SHOW' }),
    hide: ({ dispatch }) => e => dispatch({ type: 'HIDE' }),
    toggle: ({ dispatch }) => e => dispatch({ type: 'TOGGLE' }),
  })
);
