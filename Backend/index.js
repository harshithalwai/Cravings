import app from "./app.js";
import { axios } from 'axios';
const port = process.env.PORT || 4000;

//listing on the port axios

app.listen(port, () =>
  console.log(` app listening on port ${port}!  \n http://localhost:${port}`)
);

