import './pagination.scss';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({page, setPage}: PaginationProps) {
  const numberOfPages = 7;
  console.log(page);

  return (
    <div className='pagination'>
      {Array.from({length: numberOfPages}, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setPage(index)}
          className={page === index ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
