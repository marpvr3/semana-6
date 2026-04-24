import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';

const createToken = (user) => {
  const secret = process.env.JWT_SECRET || process.env.SECRET_KEY;
  if (!secret) throw new Error('No se configuró JWT_SECRET en el archivo .env');

  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });
    res.json({ status: 'ok', data: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error consultando usuarios' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    res.json({ status: 'ok', data: user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'Id de usuario inválido' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Nombre, email y contraseña son obligatorios' });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) return res.status(409).json({ status: 'error', message: 'El email ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });
    const token = createToken(user);

    res.status(201).json({ status: 'ok', data: { user, token } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error registrando usuario' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email y contraseña son obligatorios' });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });

    const token = createToken(user);
    res.json({ status: 'ok', data: { user, token } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error iniciando sesión' });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await userModel.findByIdAndUpdate(req.params.id, { name, email }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    res.json({ status: 'ok', data: user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: 'No se pudo actualizar el usuario' });
  }
};
