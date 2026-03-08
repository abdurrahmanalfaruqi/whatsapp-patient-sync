function normalizePhone(phone) {

  if (!phone) return null;

  phone = phone.replace(/\s+/g, "").replace(/-/g, "");

  if (phone.startsWith("+62")) {
    phone = "0" + phone.slice(3);
  }

  if (phone.startsWith("62")) {
    phone = "0" + phone.slice(2);
  }

  return phone;
}

module.exports = normalizePhone;