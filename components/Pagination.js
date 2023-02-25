import React from 'react';

export default function Pagination({
  items,
  pageSize,
  currentPage,
  onPageChange,
}) {
  const pagesCount = Math.ceil(items / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      <ul className="flex justify-center items-center m-auto gap-[20px] pb-[100px]">
        {pages.map((page) => (
          <li
            onClick={() => onPageChange(page)}
            key={page}
            className={
              page === currentPage
                ? 'flex justify-center items-center w-[2rem] h-[2rem] border-[1px] border-[#eaeaea] rounded-[0.5rem] cursor-pointer bg-black/30'
                : 'flex justify-center items-center w-[2rem] h-[2rem] border-[1px] border-[#eaeaea] rounded-[0.5rem] cursor-pointer'
            }
          >
            <a className="cursor-pointer">{page}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
