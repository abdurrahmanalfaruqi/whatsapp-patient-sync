const fs = require("fs");
const csv = require("csv-parser");
const normalizePhone = require("./phoneNormalizer");

const nikPhoneMap = {};

function readCSV() {

  return new Promise((resolve) => {

    fs.createReadStream("data/whatsapp-data.csv")
      .pipe(csv())
      .on("data", (row) => {

        const nik = row.nik_identifier;
        const phone = normalizePhone(row.whatsapp_number);

        nikPhoneMap[nik] = phone;

      })
      .on("end", resolve);

  });

}

function updatePatients() {

  const raw = fs.readFileSync("data/patients-data.json");

  const data = JSON.parse(raw);

  const patients = data.patients_before_phone_update;

  patients.forEach((patient) => {

    const identifiers = patient.resource.identifier;

    let nik = null;

    identifiers.forEach((id) => {

      if (id.system === "https://fhir.kemkes.go.id/id/nik") {
        nik = id.value;
      }

    });

    if (nik && nikPhoneMap[nik]) {

      patient.resource.telecom = [
        {
          system: "phone",
          use: "mobile",
          value: nikPhoneMap[nik]
        }
      ];

    }

  });

  fs.writeFileSync(
    "output/patients_updated.json",
    JSON.stringify(patients, null, 2)
  );

}

async function main() {

  await readCSV();

  updatePatients();

  console.log("Update selesai");

}

main();