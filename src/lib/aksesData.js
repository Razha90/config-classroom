const { default: User } = require("@/schema/user");

async function getData(email) {
  User.findOne({ email: email });
  return User;
}

export default getData;