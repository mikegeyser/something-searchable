import { h } from 'preact';
import { useSelector } from 'react-redux';

export const Header = () => {
  const { title } = useSelector((state) => state.app);

  return <h1>{title}</h1>;
};
