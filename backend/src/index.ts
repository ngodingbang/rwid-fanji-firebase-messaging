import { app } from './app';
import mongoose from 'mongoose';

const PORT = Bun.env.PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(Bun.env.MONGODB_URI!, {
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

startServer();
