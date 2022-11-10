import CloseIcon from '@src/icons/CloseIcon';
import SearchIcon from '@src/icons/SearchIcon';
import { useEffect, useRef, useState } from 'react';

const SearchRoarr = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);

  const closeByEscapeKey = (e: KeyboardEvent) => {
    if (isOpen) {
      if (e.key === 'Escape') {
        console.log('close');
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByEscapeKey);
    return () => {
      document.removeEventListener('keydown', closeByEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className="sticky inset-0 z-10 bg-slate-800">
      <div className="relative flex items-center h-16 py-2">
        <div className="relative w-full h-full">
          <input
            ref={searchRef}
            onChange={(e) => setSearchKey(e.target.value)}
            value={searchKey}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            className="w-full h-full pl-12 pr-12 overflow-hidden transition-all duration-200 ease-in-out outline-none rounded-xl dark:bg-slate-800 brightness-125 focus:border-transparent placeholder:text-slate-500 dark:focus:ring-[3px] dark:focus:ring-yellow-600"
            placeholder="Search Roarr"
          />
          <div className="absolute top-[12px] left-3">
            <SearchIcon />
          </div>
          {searchKey !== '' && (
            <button
              onClick={() => {
                setSearchKey('');
                searchRef.current?.focus();
              }}
              className="absolute top-[12px] right-3"
            >
              <CloseIcon />
            </button>
          )}
        </div>
        {isOpen && (
          <div className="absolute p-2 left-0 right-0 top-16 shadow rounded-xl bg-slate-900 min-h-[90px] max-h-[400] overflow-y-auto overflow-x-hidden">
            {searchKey === '' ? (
              <div className="text-sm text-center">Try searching for people, topics, or keywords</div>
            ) : (
              <div>{searchKey}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRoarr;
