import anecdotesServices from '../services/anecdotes';
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId,
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_STATE':
      return action.data;
    case 'VOTE': {
      let modified = state.find((anecdote) => anecdote.id === action.data.id);
      modified = { ...modified, votes: modified.votes + 1 };
      return state.map((anecdote) =>
        anecdote.id === modified.id ? modified : anecdote
      );
    }

    case 'CREATE':
      return [...state, action.data.anecdote];
    // state.concat(asObject(action.data.anecdote));

    default:
      return state;
  }
};

export const initState = () => {
  return async (dispatch) => {
    const res = await anecdotesServices.getAll();
    dispatch({ type: 'INIT_STATE', data: res });
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    await anecdotesServices.voteForAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id },
    });
  };
};

export const create = (anecdote) => {
  return async (dispatch) => {
    const res = await anecdotesServices.addAnecdote(anecdote);
    dispatch({ type: 'CREATE', data: { anecdote: res } });
  };
};

export default reducer;
