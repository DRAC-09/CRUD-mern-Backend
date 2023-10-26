import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true, // Descarta los espacios.
    },
    email: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true, // Añade fecha creacion y actualizacion del registro.
  }
);

export default mongoose.model("User", userSchema);
