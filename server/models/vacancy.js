const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, require: true, unique: true }, // назва вакансіїї
  type: { type: String }, // тип роботи за напрямком ( тіпа мода, кулінарія, ІТ і тд. )
  description: { type: String, required: true }, // опис
  salaryDown: { type: String }, // нижня межа зарплати
  isSalaryMatched: { type: Boolean }, // чи зарплата вказана
  salaryUp: { type: String }, // верхня межа зарплати
  dateCreation: { type: String, required: true }, // Date.toTimeString час створення
  isHot: { type: Boolean }, // чи гаряча вакансія
  isRemote: { type: Boolean }, // чи віддалена
  author: {
    // дані автора
    id: { type: String, require: true }, // ну тіпа його ід
    contacts: {
      email: { type: String }, // емейл автора
      phoneNumber: { type: String }, // номер телефону
      telegram: { type: String }, // нік в тг
      instagram: { type: String }, // нік в інсті
    },
  },
});

module.exports = model("Vacancy", schema);
