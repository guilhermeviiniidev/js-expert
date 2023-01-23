class User {
  constructor({ name, id, profession, age }) {
    this.name = name.trim();
    this.id = Number(id);
    this.profession = profession.trim();
    this.birthDay = new Date().getFullYear() - age;
  }
}
module.exports = User;
