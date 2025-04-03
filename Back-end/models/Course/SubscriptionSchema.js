

import mongoose, { Schema } from "mongoose";


const subscriptionSchema = new Schema({

    subscriber:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },

    course:{
        type:Schema.Types.ObjectId,
        ref:'Course'
    }
})


export const Subscription = mongoose.model("Subscription",subscriptionSchema);