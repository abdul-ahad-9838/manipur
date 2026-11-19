import crypto from "crypto";

export const generateHash = (
  key,
  txnid,
  amount,
  productinfo,
  firstname,
  email,
  salt,
) => {
  const hashString = [
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    salt,
  ].join("|");

  return crypto.createHash("sha512").update(hashString).digest("hex");
};
