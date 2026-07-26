const Card = (props) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      {props.children}
    </div>
  );
};

export default Card;