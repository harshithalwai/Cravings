import app from "./app.js";
const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(` app listening on port ${port}!  \n http://localhost:${port}`)
);

