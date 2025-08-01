import { Router } from "express";
import {getUsers, getUser} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();


userRouter.get('/', authorize, getUsers);
userRouter.get('/:id', authorize, getUser); 

userRouter.post('/', (req, res) => {
    res.send({body: {title: 'POST a user'}});
});

userRouter.put('/:id', (req, res) => {
    res.send({body: {title: 'PUT a user'}});
});

userRouter.delete('/:id', (req, res) => {
    res.send({body: {title: 'DELETE a user'}});
});

export default userRouter;

