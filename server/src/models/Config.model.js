import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['ai', 'email', 'social', 'general'],
        default: 'general'
    },
    description: String,
    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Config = mongoose.model('Config', configSchema);

export default Config;
