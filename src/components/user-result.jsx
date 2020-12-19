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
    <div className='user'>
      <img src={avatar_url} alt={`Profile picture for ${login}.`}></img>
      <a href={html_url} target='__blank' className='name'>
        {name} - @{login}
      </a>
      <div className='bio'>{bio}</div>
      <div className='numbers'>
        {followers} followers, {public_repos} public repos.
      </div>
      <div className='joined'>Joined on {created_at}</div>
    </div>
  );
};
