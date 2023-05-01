import React from "react";
import { ButtonComponent } from "react-library";

type Props = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ totalPages, currentPage, onPageChange }) => {
    const paginationRange = 3;
    const rangeStart = Math.max(1, currentPage - paginationRange);
    const rangeEnd = Math.min(totalPages, currentPage + paginationRange);

    const pages = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
    }

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination flex items-center gap-3 justify-center py-10">
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 dark:stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            {rangeStart > 1 && <span>...</span>}
            {pages.map((page) => (
                <ButtonComponent text={String(page)} key={page} status={currentPage === page ? "active" : "inactive"} onClick={() => handlePageChange(page)} />
            ))}
            {rangeEnd < totalPages && <span>...</span>}
            <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 dark:stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;