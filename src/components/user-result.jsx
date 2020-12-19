import { h } from 'preact';
import { useSelector } from 'react-redux';

export const UserResult = ({ user }) => {
  const {
    html_url,
    login,
    name,
    avatar_url,
    bio,
    followers,
    public_repos,
    created_at,
  } = user;

  return (
    <a href={html_url} target='__blank'>
      <img
        src={avatar_url}
        alt={`Profile picture for ${login}.`}
        width={30}
        height={30}></img>
      <span>{name}</span>
      <span>{login}</span>
      <div>{bio}</div>
      <div>
        <span>{followers} followers</span>
        <span>{public_repos} public repos</span>
      </div>
      <div>Joined on {created_at}</div>
    </a>
  );
};
