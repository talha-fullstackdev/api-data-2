
const Card = ({ children, className }) => {
  return (
    <div className={`p-4 bg-white rounded shadow ${className}`}>
      {children}
    </div>
  );
};

export default Card;
