import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Test 233123" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
