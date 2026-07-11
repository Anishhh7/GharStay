export default{
  users: {
    create: ["superAdmin"],
    readAll: ["superAdmin"],
    update: ["superAdmin"],
    delete: ["superAdmin"]
  },

  rooms: {
    create: ["admin", "superAdmin"],
    update: ["admin", "superAdmin"],
    delete: ["admin", "superAdmin"]
  },

  packages: {
    create: ["admin", "superAdmin"],
    update: ["admin", "superAdmin"],
    delete: ["admin", "superAdmin"]
  },

  menu: {
    create: ["admin", "superAdmin"],
    update: ["admin", "superAdmin"],
    delete: ["admin", "superAdmin"]
  }
};
