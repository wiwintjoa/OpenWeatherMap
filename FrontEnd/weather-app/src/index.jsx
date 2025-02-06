import React from "react";
import ReactDOM from "react-dom/client"; // Notice the '/client'
import WeatherApp from "./App";
import "./index.css"; // Optional styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<WeatherApp />);
