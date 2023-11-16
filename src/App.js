import "./App.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div className="mainImg">
        <img
          className="logo"
          src="https://udwns310.github.io/dongcar/DongCar.png"
        />
      </div>
      <div className="main">
        <h4 className="ment">저렴하게 이동하세요</h4>
      </div>

      <div className="d-grid gap-2">
        <Button className="startbtn" variant="primary" size="lg">
          시작하기
        </Button>
      </div>
    </div>
  );
}

export default App;