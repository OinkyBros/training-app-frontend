enum Role {
  TOP = "TOP",
  JUNGLE = "JUNGLE",
  MID = "MID",
  BOT = "BOT",
  SUPP = "SUPP",
  NONE = "NONE",
}

export const roleOrder = {
    [Role.TOP]: 0,
    [Role.JUNGLE]: 1,
    [Role.MID]: 2,
    [Role.BOT]: 3,
    [Role.SUPP]: 4,
    [Role.NONE]: 5,
};

export default Role;