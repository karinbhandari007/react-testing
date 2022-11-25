import "./App.css";
import Button from "./components/Button/Button";
import { DropdownList } from "./components/DropdownList/DropdownList";

const labels = {
  hide: "Hide",
  show: "Show",
};

const data = [
  { value: "1", label: "Item 1" },
  { value: "2", label: "Item 2" },
  { value: "3", label: "Item 3" },
];

function App() {
  return (
    <div className="App-header">
      <Button label="Click Here!" onClick={() => {}} />
      <DropdownList data={data} labels={labels} onRemoveItem={() => {}} />
    </div>
  );
}

export default App;
