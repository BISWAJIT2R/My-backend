import "dotenv/config";
import { app } from "./app.js";
import IsdbConnected from "./db/ConnectDataBase.js";

IsdbConnected().then(() => app.listen(process.env.PORT, () => {
  console.log(`server runing on ${process.env.PORT}`);
})).catch((e) => console.log(e))