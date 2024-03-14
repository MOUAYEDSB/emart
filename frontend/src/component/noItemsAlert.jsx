import Alert from "react-bootstrap/Alert";

const NoItemsAlert = () => {
  return (
    <>
      {["dark"].map((variant) => (
        <Alert key={variant} variant={variant}>
          Sorry, no items to display in this moment.
        </Alert>
      ))}
    </>
  );
};

export default NoItemsAlert;
