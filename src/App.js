import logo from './logo.svg';
import './App.css';
import CustomDatePicker from './components/Datepicker';

function App() {
  return (
    <div className="App">
           <CustomDatePicker singleMonthOnly={false}></CustomDatePicker>
    </div>
  );
}

export default App;
