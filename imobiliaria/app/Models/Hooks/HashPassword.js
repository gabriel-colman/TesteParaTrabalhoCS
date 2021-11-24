"use strict";

const Hash = use("Hash");
const HashPassword = (exports = module.exports = {});

HashPassword.hashPassword = async (data) => {
  if (data.dirty.senha) {
    data.senha = await Hash.make(data.senha);
  }
};
