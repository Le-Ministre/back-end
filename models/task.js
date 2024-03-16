import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
 
  // Définissez d'autres champs au besoin
});



const TaskModel  = mongoose.model('Task', taskSchema)
export default TaskModel