import { useState } from 'react';

export const useClientPagination = <D>(pageSize: number, data: D[]) => {
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = data.slice(startIndex, endIndex);

  const isFirstPage = page === 1;
  const isLastPage = page * pageSize >= data.length; 

  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage(page - 1);

  return { currentPageData, isFirstPage, isLastPage, nextPage, previousPage };
}
