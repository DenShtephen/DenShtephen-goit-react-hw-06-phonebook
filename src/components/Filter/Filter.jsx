import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contactsSlice';
import '../../index.css';
import { selectFilters } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilters);

  const handleFilterChange = evt => {
    dispatch(setFilter(evt.target.value));
  };

  return (
    <input
      type="text"
      value={filter}
      onChange={handleFilterChange}
      className="filter-input"
      placeholder="Search contacts by name"
    />
  );
};
