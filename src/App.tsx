import { useRef, useState } from "react";
import "./Styles/App.css";
import Grid from "./Styles/Grid";
import FrontPage from "./FrontPage";
const App = () => {
  let windowHeight = useRef(window.innerHeight);
  let windowWidth = useRef(window.innerWidth);
  const [showPage, setshowPage] = useState(true);

  function HandleFrontPageClick() {
    setshowPage(false);
  }

  return (
    <>
      <div>
        {showPage ? (
          <FrontPage buttonClick={HandleFrontPageClick} />
        ) : (
          <div className="centerMain">
            <Grid
              rowcount={windowHeight.current}
              column={windowWidth.current}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
