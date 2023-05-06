import Form from "./components/Form/Form";
import "./App.css";

const App = () => {
  return (
    <div className="main">
      <div className="form-container">
        <div className="header-h1">
          <h1 className="h3">Бронирование переговорной</h1>
        </div>
        <Form />
      </div>
    </div>
  );
};

export default App;
