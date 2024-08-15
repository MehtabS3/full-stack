const Total = ({ parts }) => {
  let total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>the total is {total}</p>;
};

export default Total;
