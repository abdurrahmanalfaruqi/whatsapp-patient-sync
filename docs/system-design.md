# Nightly WhatsApp Phone Sync – System Design

## Overview

This system synchronizes WhatsApp phone numbers from a Google Sheet to the national FHIR patient registry every night.

The job runs automatically at **23:00 Asia/Jakarta** and processes all records updated during the day.

---

## Architecture

Components:

1. Scheduler
2. Data Ingestion Worker
3. Processing Service
4. FHIR Integration Layer
5. Monitoring & Logging
6. Secrets Manager

---

## Data Flow

1. Scheduler triggers job at 23:00
2. Worker reads updated rows from Google Sheets
3. Phone numbers are normalized
4. Patient is searched by NIK in FHIR server
5. telecom.mobile.phone is updated
6. Results are logged

---

## Performance Strategy

The system processes updates using parallel workers.

Target throughput:

20,000 updates within 30 minutes

≈ 11 updates per second

Parallel processing ensures the requirement is met.

---

## Retry Strategy

Failed API requests are retried up to 3 times using exponential backoff.

If still failing, the record is stored for later reprocessing.

---

## Security

- API keys stored in a secrets manager
- Communication secured with HTTPS
- Service accounts follow least privilege principle

---

## Monitoring

Operators can monitor:

- Records processed
- Success rate
- Failure rate
- Job duration

Alerts are triggered when failure rate exceeds threshold.

---

## Disaster Recovery

Operators can rerun the job for a specific date if needed.