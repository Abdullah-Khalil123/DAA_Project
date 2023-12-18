const FrontPage = (props: { buttonClick: any }) => {
  return (
    <div>
      <h1>Project : Conways Game of Life</h1>
      <h2>Group Members</h2>
      <h3>Abdullah Khalil 01-134212-007</h3>
      <h3>Hubab Ahmed 01-134212-059</h3>
      <h3>Zia ul Hassan 01-134212-???</h3>

      <button onClick={props.buttonClick}>Start Project</button>
    </div>
  );
};

export default FrontPage;
