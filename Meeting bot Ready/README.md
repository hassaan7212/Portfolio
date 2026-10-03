# WhatsApp AI Meeting Scheduler

An AI-powered WhatsApp meeting scheduling assistant using n8n,

Google Gemini, PostgreSQL, Google Calendar, and Green-API.

## 🚀 Workflow Overview

``` text

WhatsApp Incoming Message

↓

Green-API Trigger

↓

AI Agent

↙  ↓   ↘

Gemini Memory Scheduling Tools

↓

Validation & Availability

↓

User Confirmation

↓

PostgreSQL + Google Calendar

↓

WhatsApp Reply

```

## 🎯 What This Automation Does

The assistant can:

-  communicate with users through WhatsApp,

-  respond in the user's language,

-  collect only required meeting information,

-  remember information across messages,

-  ask only for missing information,

-  validate user input,

-  check meeting availability,

-  show a final confirmation summary,

-  wait for explicit confirmation,

-  store meeting information in PostgreSQL,

-  schedule the meeting in Google Calendar,

-  send the result back through WhatsApp.

## 🧩 Required Meeting Information

Field        Purpose

-------------------- ----------------------------------------------

`full_name`     User's full name

`company`      Company name; `N/A` when there is no company

`purpose`      Reason for the meeting

`meeting_date`    Requested meeting date

`meeting_location`  Meeting location

`email`       User's email

`phone`       User's phone number

## 🏗️ Architecture

``` text

WhatsApp User

│

▼

Green-API Trigger

│

▼

AI Agent

╱    │    ╲

▼    ▼    ▼

Gemini  PostgreSQL Calendar

Model   Memory   Tools

│

▼

Scheduling Tools

╱       ╲

▼        ▼

PostgreSQL     Google Calendar

Record       Meeting

│

▼

WhatsApp Reply

```

## ⚙️ Main Components

### Google/Green-API WhatsApp Trigger

The workflow is triggered from Green-API's `incomingMessageReceived` trigger

and the message is passed to the AI Agent.

### AI Agent

The AI Agent is the central orchestration component. Its system prompt

defines information collection, validation, availability checks,

confirmation, database storage, scheduling, language handling, and

privacy rules.

### Gemini Chat Model

The exported workflow uses the Gemini model configured as:

``` text

models/gemini-3.5-flash

```

### PostgreSQL Memory

The PostgreSQL Chat Memory is linked to the AI Agent. The session key

is set as:

``` text

$json.senderData.chatId

```

This links the conversation memory to the WhatsApp chat session.

### PostgreSQL Meeting Tool

The AI Agent can store:

``` text

session_id

full_name

company

purpose

meeting_date

meeting_location

email

phone

```

in the `meeting_record` table.

### PostgreSQL Availability Check

The workflow contains a PostgreSQL tool to check if the requested

meeting date already exists in the meeting records.

### Google Calendar Availability

The AI Agent has a Google Calendar availability tool linked to the

`n8n meetings` calendar.

### Google Calendar Scheduling

The AI Agent also has a Google Calendar scheduling tool to create the

meeting after confirmation.

### WhatsApp Response

The AI Agent's output is returned to the user's WhatsApp chat via

Green-API.

## 🧠 Conversation Logic

1. Read the current message and previous conversation memory.

2. Extract information that has already been provided.

3. Combine the new information with the existing information.

4. Ask only for the missing fields.

5. Validate all fields that are required.

6. Check both PostgreSQL and Google Calendar availability.

7. If unavailable, ask only for a new date.

8. Display the complete meeting summary.

9. Wait for the user's confirmation.

10. After confirmation, store the meeting and schedule it.

11. Return a concise WhatsApp response.

## 🔐 Validation

### Full Name

Must have at least two letters and must not be empty or numeric-only.

### Email

Must have exactly one `@` and a dot after `@`, no spaces, and text

before and after `@`.

### Phone

The prompt accepts Pakistan format:

``` text

03XXXXXXXXX

```

or international format:

``` text

+923001234567

```

### Meeting Date

The date must be valid, not in the past, and not impossible. Relative

dates such as `Tomorrow` and `Next Monday` are converted to absolute

dates when possible.

## 🤝 Confirmation

The AI Agent displays a complete meeting summary and asks the user to

confirm it.

Confirmation examples configured in the prompt include:

``` text

YES / Yes / Y / Correct / Confirmed / Confirm / Proceed

Looks good / Everything is correct / Okay / OK / Fine

ہاں / جی / ٹھیک ہے / درست ہے / کنفرم

```

The prompt tells the agent to call the PostgreSQL tool exactly once

after confirmation.

## 🗄️ Database

The workflow uses a PostgreSQL table named:

``` text

meeting_record

```

Relevant fields:

``` text

session_id

full_name

company

purpose

meeting_date

meeting_location

email

phone

booking_time

```

## 🔧 AI Agent Tools

``` text

AI Agent

│

├── Insert rows

│    └── PostgreSQL

│

├── available dates

│    └── Google Calendar

│

├── Execute query to check

│    └── PostgreSQL

│

└── schedule the meeting

└── Google Calendar

```

## 🛠️ Technologies

-  n8n

-  Green-API / WhatsApp

-  Google Gemini

-  PostgreSQL

-  Google Calendar

-  AI Agent / Tool Calling

-  Persistent conversation memory

-  Prompt engineering

## 📈 Skills Demonstrated

-  AI agent workflows

-  conversational automation

-  prompt engineering

-  WhatsApp automation

-  PostgreSQL

-  session-based memory

-  Google Calendar integration

-  tool calling

-  data validation

-  availability checking

-  confirmation-based actions

-  multi-service integration

-  workflow orchestration

## 🔒 Security

The workflow should be sanitized before being published publicly. Never

publish API keys, OAuth tokens, database passwords, private credentials,

real customer conversations, or private database/calendar information.

## ⚠️ Production Improvements

Before production deployment, consider adding stronger time-slot and

timezone handling, explicit meeting duration, robust error branches,

duplicate-booking protection, transaction handling between PostgreSQL

and Calendar, rate limiting, authentication, and audit logging.

## 📸 Suggested Screenshots

-  Complete n8n workflow

-  WhatsApp conversation

-  AI Agent prompt

-  PostgreSQL memory/tool

-  Calendar availability

-  Database record

-  Calendar event

-  Final WhatsApp response

## 📂 Suggested Repository

``` text

WhatsApp-AI-Meeting-Scheduler/

│

├── README.md

├── workflow/

│  └── Meeting Bot 2.json

├── docs/

│  └── CASE-STUDY.md

└── screenshots/

```