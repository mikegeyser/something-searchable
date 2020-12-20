import { h } from 'preact';
import { useDispatch, useSelector } from 'react-redux';
import { performPagination } from '../store/search';

export const Pagination = () => {
  const { page, numberOfPages } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  if (!numberOfPages) return null;

  const start = Math.max(1, page - 2);
  const end = Math.min(numberOfPages, page + 2);
  const numberofPagesToRender = Math.min(Math.max(end - start + 1, 5), numberOfPages - start + 1);

  const renderButton = (i) => {
    const className = i === page ? 'current' : '';
    return (
      <button type='button' onClick={() => goToPage(i)} className={className}>
        {i}
      </button>
    );
  };

  const spacer = <span>...</span>;

  const firstPage = start !== 1 ? [renderButton(1), spacer] : [];
  const lastPage =numberOfPages > 1 && end !== numberOfPages
      ? [spacer, renderButton(numberOfPages)]
      : [];
  const middlePages = [...Array(numberofPagesToRender).keys()].map((i) => renderButton(i + start));

  const pagination = [...firstPage, ...middlePages, ...lastPage];

  const goToPage = (i) => dispatch(performPagination(i));
  const previous = () => goToPage(Math.max(page - 1, 0));
  const next = () => goToPage(Math.min(page + 1, numberOfPages));

  const disablePrevious = page === 1;
  const disableNext = page === numberOfPages;

  return (
    <div className="pagination">
      <button type='button' onClick={previous} disabled={disablePrevious}>
        &lt;
      </button>
      {pagination}
      <button type='button' onClick={next} disabled={disableNext}>
        &gt;
      </button>
    </div>
  );
};
