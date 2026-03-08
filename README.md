# WhatsApp Patient Phone Sync

This project provides a script to synchronize WhatsApp phone numbers from a shared spreadsheet into FHIR Patient resources.

The script reads patient updates from a CSV export of the Google Sheet, matches each record using the patient’s NIK identifier, and updates the `telecom` field of the corresponding FHIR Patient resource.

---

## Project Structure

```
data/
  patients-data.json        # Sample patient bundle
  whatsapp-data.csv         # Exported sheet containing NIK and phone numbers

src/
  updatePhones.js           # Main script
  phoneNormalizer.js        # Phone number normalization logic

output/
  patients_updated.json     # Generated output

docs/
  system-design.md          # Architecture and system design proposal
```

---

## Requirements

* Node.js (v16 or newer recommended)
* npm

---

## Installation

Install project dependencies:

```
npm install
```

---

## Running the Script

Execute the update script:

```
node src/updatePhones.js
```

After execution, the transformed patient bundle will be written to:

```
output/patients_updated.json
```

---

## Phone Number Handling

Phone numbers are normalized before being written to the FHIR resource.
The script converts international prefixes to the local Indonesian format when necessary.

Examples:

```
+6281234567890 → 081234567890
6281234567890  → 081234567890
081234567890   → unchanged
```

---

## Documentation

A detailed description of the proposed production architecture for the nightly synchronization service is available in:

```
docs/system-design.md
```

This document outlines the system components, data flow, scalability considerations, and operational aspects of the solution.

---

## Notes

This repository was created as part of a technical exercise demonstrating an approach for synchronizing patient contact information with a FHIR-based registry.
