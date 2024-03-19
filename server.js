import express from "express";
import dbConnect from "./dbConnect.js";
import TaskModel from "./models/task.js";
import UserModel from "./models/user.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
const corsOptions = {
  origin: ["https://abdourahamane-portfolio.vercel.app/", "https://my-admin-khaki.vercel.app/, https://my-admin-jr9jidsex-le-ministres-projects.vercel.app/"],
  credentials: true,
};
const app = express();
const port = 4000;
app.use(bodyParser());
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.get("/users", async (req, res) => {
//   const allUsers = await TaskModel.find()

//   return res.send(allUsers);

// });

// inscription ici

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Merci pour votre inscription." });
    }
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new UserModel({
      email,
      password: hashedPassword,
    });
    // Enregistrer l'utilisateur dans la base de données
    await newUser.save();

    // Répondre avec succès
    res.status(200).json({ success: true, message: "Inscription réussie." });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ error: "Erreur lors de l'inscription." });
  }
});

// verification de l'existence de l'utilisateur

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "Bien vennue monsieur l'administrateur " });
    }

    res.status(400).json({ error: "connecter vous" });
  } catch (error) {
    return res.status(400).json({
      error: "Desolé cet utilisateur n'existe pas veilleux vous inscrire.",
    });
  }
});

// Créer un nouveau projet
app.post("/api/create-task", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "le serveuur a une erreur" });
  }
});

// reccuperer tout les projet
app.get("/api/send/getTache", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "le serveur a une erreur" });
  }
});

// reccuper un seul projet via son id
app.get("/api/send/getTache:id", async (req, res) => {
  try {
    const tasks = await TaskModel.findById(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ error: "tache non dispanible" });
    }
    res.status(200).json(TaskModel);
  } catch (error) {
    res.status(500).json({ error: "le serveur a une erreur" });
  }
});

// Modifier un projet 
app.put("/api/tache/edite/:id", async (req, res) => {
  try {
    const updateTache = await TaskModel.findById(req.params.id, req.body, {
      new: true,
    });
    if (!updateTache) {
      return res.status(500).json({ error: "tache non dispanible" });
    }
    res.status(200).json(updateTache);
  } catch (error) {
    res.status(500).json({ error: "le serveur a une erreur" });
  }
});

// Supprimer un projet
app.delete("/api/tache/delete/:id", async (req, res) => {
  try {
    const deleteTask = await TaskModel.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ error: "tache non dispanible" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "le serveur a une erreur" });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
dbConnect();
