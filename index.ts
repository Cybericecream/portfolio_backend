// @/index.ts
import "reflect-metadata";
import express, { Request, Response } from "express";

import connection from "./src/services/connection";
import { Dog } from "./src/entity/dogsEntity"

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Sequelize Example 🤟" });
});

app.get("/dogs", async (req: Request, res: Response): Promise<Response> => {
  const allDogs: Dog[] = await Dog.findAll();
  return res.status(200).json(['status',allDogs]);
});

app.get("/dogs/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const dog: Dog | null = await Dog.findByPk(id);
  return res.status(200).json(dog);
});

app.post("/dogs", async (req: Request, res: Response): Promise<Response> => {
  if (req.body === {}) {
    console.log(req.body, req.body);
    const dog: Dog = await Dog.create({ ...req.body });
    return res.status(201).json(dog);
  } else {
    return res.status(500).json({'error':'Body is empty.'});
  }
});

app.put("/dogs/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  await Dog.update({ ...req.body }, { where: { id } });
  const updatedDog: Dog | null = await Dog.findByPk(id);
  return res.status(200).json(updatedDog);
});

app.delete("/dogs/:id", async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params;
      const deletedDog: Dog | null = await Dog.findByPk(id);
      await Dog.destroy({ where: { id } });
      return res.status(200).json(deletedDog);
    }
);

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
