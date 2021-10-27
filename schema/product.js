const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    ProID: { type: String, default: null, require:true },
    ProName: { type: String, default: null,require:true },
    Description: { type: String, default: null, maxLength: 100,require:true },
    Price: { type: Number, default: 0,require:true },
    imglink: { type: String, default: null, maxLength: 300,require:true },
    numofpro:{type: String, default: null, maxLength:30}
});
module.exports = mongoose.model('Product', ProductSchema, 'Products');