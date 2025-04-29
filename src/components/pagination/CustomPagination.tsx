import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPage: number;
}

export function CustomPagination({
  currentPage,
  setCurrentPage,
  totalPage,
}: PaginationProps) {
  if (totalPage <= 1) return null;

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPage <= 6) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    if (currentPage > 3) {
      pages.push("...");
    }

    const middlePages = Array.from(
      { length: 3 },
      (_, i) => currentPage - 1 + i
    ).filter((page) => page > 1 && page < totalPage);

    pages.push(...middlePages);

    if (currentPage < totalPage - 2) {
      pages.push("...");
    }

    pages.push(totalPage);
    return pages;
  };

  const handelPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handelPrevious}
            aria-label="Go to previous page"
            href="#projects"
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                href="#projects"
                aria-label={`Go to page ${page}`}
                isActive={currentPage === page}>
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            aria-label="Go to next page"
            href="#projects"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
