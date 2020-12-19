import { h } from 'preact';
import { useSelector } from 'react-redux';
import { UserResult } from './user-result';

export const Results = () => {
  const { actualTotal, total, results } = useSelector(
    (state) => state.search
  );

  if (!results.length) return null;

  const heading = actualTotal > total
    ? <h4>{actualTotal} results <span>(limited to the first {total} results, because of the github api)</span></h4>
    : <h4>{total} results</h4>;

  return (
    <div>
      {heading}
      {results.map(user => <UserResult user={user} />)}
    </div>
  );
};
