import mongoose from 'mongoose';
import environments from './environments.js';

function connect() {
  return mongoose.connect(environments.URL);
}

export default connect;