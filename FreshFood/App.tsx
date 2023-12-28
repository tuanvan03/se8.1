import React from "react";
import Navigators from './src/navigators';
import Store from "./src/Store";
import { Provider } from "react-redux";

const App: React.FC = () => (
    <Provider store = {Store}>
      <Navigators />
    </Provider>
  );
  
export default App;
