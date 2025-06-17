import {Router} from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({body: {title: 'GET all subscriptions'}});
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send({body: {title: 'GET a subscription'}});
});

subscriptionRouter.post('/', (req, res) => {
    res.send({body: {title: 'POST a subscription'}});
});

subscriptionRouter.put('/:id', (req, res) => {
    res.send({body: {title: 'PUT a subscription'}});
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({body: {title: 'cancel a subscription'}});
});


subscriptionRouter.delete('/:id', (req, res) => {
    res.send({body: {title: 'DELETE a subscription'}});
});

subscriptionRouter.get('/user/id', (req, res) => {
    res.send({body: {title: 'GET a subscription'}});
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({body: {title: 'GET a subscription'}});
});

export default subscriptionRouter;