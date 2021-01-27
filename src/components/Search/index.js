import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineClose } from "react-icons/ai";

const Search = ({ onSearchChanged }) => {
  const [search, setSearch] = useState('');
  const [timer, setTimer] = useState(null);

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
        className="input is-medium"
        type="text"
        value={search}
        placeholder="Recherchez des artistes ou des titres ..."
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
