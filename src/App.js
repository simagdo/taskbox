import './App.css';
import {Provider} from "react-redux";
import store from "./lib/store";
import InboxScreen from "./components/InboxScreen/InboxScreen";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <InboxScreen/>
            </Provider>
        </div>
    );
}

export default App;
