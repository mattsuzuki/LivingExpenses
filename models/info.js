const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infoSchema = new Schema(
  {
    email: String,
    yearsAtCurrentJob: String,
    currentLivingExpenses: String,
    expectedMonthlySalary: String,
    desiredCareer: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Info", infoSchema);
