import express from 'express';
import cors from 'cors'; //deljene podataka izmedju domena
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';
import emailRouter from './routers/email.routes';
import adminRouter from './routers/admin.routes';
import studioRouter from './routers/studio.routes';
import commentRouter from './routers/comment.routes';
import chatRouter from './routers/chat.routes';


const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '25mb'}));

mongoose.connect('mongodb://127.0.0.1:27017/radionica');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection ok!')
});

const router = express.Router();

//rutiranje za sve sto napravimo
router.use('/users', userRouter);
router.use('/forgotPassword', emailRouter);
router.use('/studios', studioRouter);
router.use('/admin', adminRouter);
router.use('/comments', commentRouter);
router.use('/chats', chatRouter);

app.use('/', router);

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));