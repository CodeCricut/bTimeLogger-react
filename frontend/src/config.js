import axios from "axios";
import Moment from "react-moment";

// axios.defaults.baseURL = `http://localhost:3001`;
axios.defaults.headers.post["Content-Type"] = "application/json";

Moment.globalFormat = "MM/DD HH:mm";
