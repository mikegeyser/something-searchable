import { h } from 'preact';
import { useSelector } from 'react-redux';

export const Results = () => {
  const { results } = useSelector((state) => state.search);

  return (
    <ul>
      {results.map(({ login, avatar_url }) => (
        <li>
          <img
            src={avatar_url}
            alt={`Profile picture for ${login}.`}
            width={30}
            height={30}></img>
          <span>{login}</span>
        </li>
      ))}
    </ul>
  );
};
