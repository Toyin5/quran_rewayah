import mongoose from 'mongoose'

const database = () => {
  return mongoose.connect('mongodb+srv://quran:quran@cluster0.me6ic.mongodb.net/quran-rewayah?retryWrites=true&w=majority')
    .then((res) => console.log('connection success : ', res.options.autoIndex))
    .catch(err => console.log('connection failed : ', err))
}

export default database;