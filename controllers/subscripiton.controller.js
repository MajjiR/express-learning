export const createSubscription = async (req, res, next) => {
    try {

        const subscription = await



        res.status(201).json({
            message: 'Subscription created successfully'
        });
    } catch (error) {
        next(error);
    }
}