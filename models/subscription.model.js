import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true , time: true, minLength: [3, "Name must be at least 3 characters long"], maxLength: [100, "Name must be at most 100 characters long"]},
    price: {type: Number, required: [true, "Price is required"], min: [0, "Price must be at least 0"]},
    currency: {type: String, required: [true, "Currency is required"], enum:['USD', 'EUR', 'GBP', 'INR'], default: 'USD'},
    frequency: {type: String, required: [true, "Frequency is required"], enum:['Monthly', 'Yearly', 'Weekly']},
    category: {type: String, required: [true, "Category is required"], enum:['sports', 'entertainment', 'music', 'gaming', 'education', 'health', 'fitness', 'travel', 'food', 'beauty', 'fashion', 'books', 'tech', 'finance', 'business', 'lifestyle']},
    paymentMethod: {type: String, required: true, trim:true},
    status: {type: String, required: true, enum:['active', 'inactive', 'cancelled', 'expired'], default: 'active'},
    startDate: {type: Date, required: true, validate: {validator: (v) => v <= new Date(), message: 'Start date must be in the past'}},
    renewalDate: {type: Date, validate: {validator: function(   v) {return v >= this.statDate}, message: 'Renewal date must be in the future'}},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, {timestamps: true});

subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            Monthly: 30,
            Yearly: 365,
            Weekly: 7
        
    }
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    // AUTO UPDATE THE STATUS IF THE RENEWAL DATE IS PAST
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});
const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
