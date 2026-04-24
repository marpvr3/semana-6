import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'El nombre es obligatorio'], trim: true },
    email: { type: String, required: [true, 'El email es obligatorio'], unique: true, lowercase: true, trim: true },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
  },
  { timestamps: true }
);

schema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const userModel = mongoose.model(collection, schema);
