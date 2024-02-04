import css from './filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/contacts/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChangeListener = event => {
    // const filterValue = event.currentTarget.value;
    // console.log(filterValue)
    const filterValue = event.currentTarget.value;
    dispatch(setFilter(filterValue.trim().toLowerCase()));
  };

  return (
    <>
      <p className={css.filterText}>Find contact by name</p>
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        onChange={handleChangeListener}
      />
    </>
  );
};

export { Filter };
