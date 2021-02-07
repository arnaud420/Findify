import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineClose } from "react-icons/ai";

const Search = ({ onSearchChanged, placeholder, isReset = false, size }) => {
  const [search, setSearch] = useState('');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (isReset) {
      resetSearch();
    }
  }, [isReset])

  const onValueChange = ({ target }) => {
    setSearch(target.value);
    clearTimeout(timer);
    setTimer(setTimeout(() => {
      onSearchChanged(target.value);
    }, 500));
  };

  const resetSearch = () => {
    setSearch('');
    onSearchChanged('');
  }

  return (
    <div className="control has-icons-left has-icons-right">
      <input
        className={`input ${size === 'medium' ? 'is-medium' : ''}`}
        type="text"
        value={search}
        placeholder={placeholder}
        onChange={onValueChange}
      />
      <span className="icon is-left">
        <FaSearch />
      </span>
      {
        search.length >= 1
          ? (
            <span className="icon is-right is-clickable pointer-auto" onClick={resetSearch}>
              <AiOutlineClose />
            </span>
          )
          : null
      }
    </div>
  );
};

export default Search;
