# ATS Recruitment Automation — n8n

An event-based recruitment workflow that brings together Zoho Recruit, n8n, Gmail, WhatsApp, Google Calendar, Google Sheets for candidate communication and internal follow-up.

## Overview

The recruitment process is one of the most mundane activities. A candidate goes through various stages, and someone has to take action at every step to notify and inform the candidate, schedule the next step, and update the tracking sheet. That’s a lot of overhead for a single application or recruitment request.

This project was initiated to automate some of these operations

The automation is set up to respond to the recruitment status change event that comes from Zoho Recruit. Based on the application stage, the automation then routes the event to the appropriate processing branch.

The objective of the automation is simple: to act depending on the recruitment stage.

---

## What this automation does

The automation begins with webhook configuration and receives candidate/application events from Zoho Recruit. Depending on the value of the `application_stage`, the automation routes the event through various branches:

| Candidate stage | Automated action |

|------------------|------------------|

| `Submissions` | Reserved routing branch in the automation/workflow |

| `Interview` | Creates a Google Calendar event and sends a notification + updates Sheets |

| `Offered` | Sends candidate communication via Gmail + WhatsApp |

| `Hired` | Sends candidate communication via Gmail + WhatsApp |

| `Rejected` | Sends a rejection email + Candidate tracking continues |

The automation thus acts as a thin event-based layer between the ATS and the communication/productivity tools used by the recruitment team.

---

## Architecture

```text

┌────────────────────┐

│  Zoho Recruit  │

│ Candidate / Status │

│   Update    │

└─────────┬──────────┘

│

▼

┌────────────────────┐

│  n8n Webhook   │

│ Receive Payload  │

└─────────┬──────────┘

│

▼

┌────────────────────┐

│  Stage Router   │

│   Switch    │

└──────┬─────┬───────┘

│   │

┌────────────┘   └──────────────┐

▼                 ▼

┌───────────────┐         ┌───────────────┐

│  Interview  │         │ Offered/Hired │

└───────┬───────┘         └───────┬───────┘

│                 │

┌───────┼────────┐          ┌─────┴─────┐

▼    ▼    ▼          ▼      ▼

Calendar Gmail  Sheets       Gmail   WhatsApp

│

▼

Candidate

tracking

```

The `Switch` node is the decision-making unit of this automation. It evaluates the `application_stage` and routes the event to the relevant processing/steps. The automation is simple enough, but the routing is clearly visible in the configuration.

The automation checks if the `application_stage` equals any of the expected values before taking any action.

---

## Tech Stack

- n8n — workflow automation tool

- Zoho Recruit — recruitment/ATS system

- Webhooks — event-based communication

- Gmail — candidate communication

- WhatsApp (Green-API) — candidate communication

- Google Calendar — interview/event scheduling

- Google Sheets — candidate tracking

- JavaScript Expressions — dynamic values, routing logic

---

## Example Input

The webhook event that this automation is designed to receive looks something like this:

```json

{

"Email": "candidate@example.com",

"application_status": "Converted - Employee",

"application_stage": "Hired",

"candidate_name": "Candidate Name",

"Job": "Job Identifier",

"application_id": "APPLICATION_ID",

"Mobile": "+92XXXXXXXXXX"

}

```

Note: For a public GitHub repository, it’s best to use fake/demo events instead of real candidate data.

---

## How the routing works

### 1. Webhook receives the event

The automation exposes a webhook endpoint called `Zoho-Recruit`. The event sent to this endpoint contains the candidate/application data, including candidate name, email, mobile, application stage, application status, job, and application id.

This webhook is thus the entrance point for this automation.

### 2. Stage-based routing

The `Switch` node evaluates:

```text

$json.body.application_stage

```

and routes the event to various processing branches. This way, the automation is readable, and the addition of new recruitment stages is straightforward.

### 3. Interview branch

When the value of `application_stage` is `Interview`, the automation proceeds to create a Google Calendar event and then continues to the candidate (and internal) communication and Sheets tracking.

The automation also contains a `Google Sheets` operation in which the mode is set to `appendOrUpdate` so that the candidate can be written to or updated in the tracking sheet.

### 4. Offer / hiring communication

The `Offered` and `Hired` stages are processed similarly, with the main difference being the additional WhatsApp message in the latter. Candidate-specific values have been replaced with {{expressions}} so that these can be populated dynamically once the automation reaches this point. For example, the message contains the following values:

```text

candidate_name

Job

Mobile

```

This way, the same message can be sent to different candidates by simply reusing the same automation.

### 5. Rejection handling

The `Rejected` branch only contains a Gmail step that sends a message to the candidate’s email address. More features can be added to this branch in the future, such as a proper rejection email template, feedback collection, logging, analytics, etc.

---

## Why I built it

The interesting thing about this project is that it doesn’t involve anything special. It is the orchestration of various operations that makes this automation worth writing about. When a single event initiates several automation steps, it becomes essential to design the workflow so that it is intuitive and can scale. This is the main lesson from this project:

> One business event → intelligent routing → multiple system actions.

This is also a perfect use-case for demonstrating the power of workflow automation: individual tools are helpful, but it’s the orchestration that delivers tangible results.

---

## Key Automation Concepts Demonstrated

| Concepts | Description |

|---------|-------------|

| Event-based architecture | The automation is triggered by Zoho Recruit webhook and does not have to poll for any changes |

| Conditional routing | The `Switch` node directs the automation flow depending on the value of `application_stage` |

| Dynamic data mapping | Candidate data is extracted from the webhook JSON and dynamically inserted into the appropriate nodes (Gmail, Sheets, WhatsApp, etc.) |

| Multi-system orchestration | A single candidate can be processed by multiple systems before being tracked in Sheets |

| Chaining operations | Some automation branches can contain multiple operations as opposed to a single action |

---

## Project Structure

```text

ats-recruitment-automation/

│

├── README.md

├── CASE_STUDY.md

├── workflow/

│  └── ATS.json

│

├── docs/

│  ├── architecture.md

│  └── screenshots/

│

└── assets/

├── workflow-overview.png

└── demo.gif

```

Note: Before pushing to a public repository, make sure to sanitize credentials, URL, and other sensitive information.

---

## Setup

### Prerequisites

To deploy this automation, you will need:

- An n8n instance

- Zoho Recruit access

- Gmail OAuth credentials

- Google Calendar access

- Google Sheets access

- WhatsApp provider/API access

- A publicly accessible webhook endpoint for the Zoho webhook

### Basic setup

1. Import the workflow JSON and configure credentials

2. Set up the webhook for Zoho Recruit

3. Set up Gmail

4. Set up Google Calendar

5. Set up Google Sheets

6. Set up WhatsApp provider/API

7. Configure candidate message templates

8. Test individual recruitment-stage branches

9. Enable the automation

Note: The details of the setup will depend on your infrastructure.

---

## Security & Privacy

This project is about recruitment data, and thus, it is essential to take data privacy seriously. A few things to consider before publishing this automation on a public platform (e.g., GitHub):

- Remove OAuth client IDs

- Remove API keys and tokens

- Remove sample emails

- Remove candidate data

- Remove phone numbers

- Remove webhook URLs

- Remove Sheet/document IDs

- Use environment variables or n8n credentials where applicable

- Use demo payloads

In short: never publish sensitive data on a public platform such as GitHub. A portfolio repository is a great way to host automation projects while keeping production data private and secure.

---

## Limitations & Possible Improvements

As mentioned, this automation is not meant to be a full-blown enterprise-level recruitment system. That said, there are several ways to improve and extend this automation. A few ideas:

- Richer rejection email

- Richer interview scheduling logic

- Interview reminder notifications

- Candidate confirmation messages

- Error handling/retry logic

- Logging

- Duplicate-event protection

- Status reporting

- Slack/Teams notifications

- Feedback collection

- Analytics

- Environment-specific configuration

- Better webhook validation

- Success/failure monitoring

- AI-powered personalization

---

## What I learned

This automation helped me realize several fundamental concepts about automation in general and n8n specifically. One of the key insights was that the connection between two systems is rarely the hard part. Once you have the data, it’s essential to have a logical workflow in place to make sense of it. Some design principles that can be taken forward into other automation and AI-agent projects:

- Define a meaningful trigger

- Ensure reliable data capture

- Use intuitive routing

- Define meaningful actions

- Add error handling/retry logic

- Keep the automation maintainable

- Consider data privacy

---

## Author

Muhammad Hassaan Irshad

Automation Engineer

Focus areas:

`n8n` · `Webhooks` · `Workflow Architecture` · `APIs` · `Node.js` · `Docker` · `LLM Integration` · `MCP` · `AI-Assisted Development`

---

## License

Add your license here.

A portfolio/demo repository should remain public, but it’s best to avoid granting end-users rights to your private repositories. To do that, add a copyright notice and repository-specific terms.