import app from './app.js';
import { PORT } from './config/env.js';
import { connectDB } from './config/db.js';

// Connect to Database
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
