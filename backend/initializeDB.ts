import mongoose from 'mongoose'
const AutoIncrement = require('mongoose-sequence')(mongoose)

// Deprecation warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@url-shortener-cluster.lv0i9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

export { AutoIncrement }
