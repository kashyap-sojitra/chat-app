const Yup = require("yup");

const formSchema = Yup.object({
  username: Yup.string()
    .required("Username required")
    .min(4, "Username too short")
    .max(28, "Username too long!"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Password too short")
    .max(28, "Password too long!"),
});

const friendSchema = Yup.object({
  friendName: Yup.string()
    .required("Username required")
    .min(4, "Invalid username!")
    .max(28, "Invalid username!"),
});

const groupSchema = Yup.object({
  groupId: Yup.string()
    .required("GroupId required")
    .min(4, "Invalid groupId!")
    .max(28, "Invalid groupId!"),
});

module.exports = { formSchema, friendSchema, groupSchema };
