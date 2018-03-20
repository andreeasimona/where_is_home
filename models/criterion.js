"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CreateCriterionSchema = function (countryName) {
    var CriterionSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        countryId: {
            type: String,
            required: true
        },
        value: {
            type: Number,
        }
    }, {
        collection: countryName
    });

    var criterionModel = mongoose.model(countryName, CriterionSchema);
    return criterionModel;
};

module.exports = CreateCriterionSchema;