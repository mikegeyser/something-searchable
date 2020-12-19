import { h } from 'preact';
import { useSelector } from 'react-redux';

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
      {results.map(({ login, avatar_url }) => (
        <div>
          <img
            src={avatar_url}
            alt={`Profile picture for ${login}.`}
            width={30}
            height={30}></img>
          <span>{login}</span>
        </div>
      ))}
    </div>
  );
};
