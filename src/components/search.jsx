import { h } from 'preact';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, performSearch } from '../store/search';

export const Search = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search);

  const disabled = !(query?.length > 0);

  const onChange = (e) => dispatch(setQuery(e.target.value));
  const onClick = () => dispatch(performSearch(query));
  const onKeyPress = ({ key }) => {
    if (key === 'Enter') {
      onClick();
    }
  };

  return (
    <div className='search'>
      <input
        type='text'
        autoFocus={true}
        value={query}
        onChange={onChange}
        onKeyPress={onKeyPress}></input>
      <button type='button' onClick={onClick} disabled={disabled}>
        Search
      </button>
    </div>
  );
};
