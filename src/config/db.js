import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.URI_DB;
    if (!uri) throw new Error('No se configuró MONGODB_URI en el archivo .env');
    await mongoose.connect(uri);
    console.info('Conexión con MongoDB realizada correctamente');
  } catch (error) {
    console.error('Error conectando con MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
