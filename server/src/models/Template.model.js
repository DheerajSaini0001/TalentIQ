import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: ['classic', 'modern', 'creative', 'tech'],
        default: 'modern'
    },
    thumbnailColor: String,
    metadata: {
        type: Map,
        of: String
    }
}, { timestamps: true });

const Template = mongoose.model('Template', templateSchema);

export default Template;
