import byCrypt from "bcrypt";
export const encryptPasssword = async (password: string) => {
  const salt = await byCrypt.genSalt(10);
  return await byCrypt.hash(password, salt);
};
export const matchPassword = async function (
  passwordEntered: string,
  password: string
) {
  return await byCrypt.compare(passwordEntered, password);
};
