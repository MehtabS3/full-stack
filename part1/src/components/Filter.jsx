const Filter = (props) => {
  const { onFilter } = props;

  return (
    <p>
      finde countries <input onChange={onFilter} />
    </p>
  );
};
export default Filter;
