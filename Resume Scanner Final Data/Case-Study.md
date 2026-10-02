# Case Study --- AI Resume Scanner Automation

## 1. Project Summary

### Project

AI Resume Scanner

### Category

AI Automation / Recruitment Automation

### Platform

n8n

### Objective

The objective of this project is to automate the first stage of screening

resumes that come in through a recruitment form.

The workflow ties together a candidate intake process with Google Workspace,

Google Drive, Gemini, Gmail, and WhatsApp to enable a submitted resume to be

retrieved, analyzed, recorded and communicated.

------------------------------------------------------------------------

## 2. The Problem

Initial screening of resumes can be a repetitive task when dealing with high volumes

of applications.

A manual process would involve for each application:

1. opening the application,

2. finding the candidate's CV,

3. reviewing the candidate's resume,

4. identifying relevant skills and experience,

5. making a record of the evaluation,

6. and communicating the outcome.

The project aims to address this first level review task by implementing an

automated AI-assisted screening process.

------------------------------------------------------------------------

## 3. Solution

The proposed solution is built using n8n as the core orchestrator:

``` text

Google Form

↓

Google Sheets

↓

n8n Google Sheets Trigger

↓

Status Check

↓

Google Drive — Download CV

↓

Gemini 2.5 Flash — Resume Analysis

↓

Conditional Evaluation

↓

Google Sheets Update

├───────────────┐

↓        ↓

Gmail     WhatsApp

```

The workflow is designed to bring together multiple platforms in a recruitment

automation solution.

------------------------------------------------------------------------

## 4. Input

The workflow uses the candidate information record from the Google Sheets response

sheet.

The exported workflow refers to the following fields:

-  Timestamp

-  Name

-  Email

-  CV

-  Processed

-  Short_Listed

The `CV` field is used to store the Google Drive file identifier for the

submitted resume.

------------------------------------------------------------------------

## 5. Automation Process

### Step 1 --- Detect a submission

The Google Sheets Trigger reads the response sheet every minute looking for new

submissions.

It then passes the candidate data to the next step in the workflow.

### Step 2 --- Check processing status

An IF node checks the value of the `Processed` field.

The exported workflow currently looks for a `Yes` value in this field.

This should be reviewed in the production version of the portfolio workflow since

it is more likely that an automation would want to trigger on rows that have NOT

been processed.

### Step 3 --- Retrieve the CV

The Google Drive node retrieves the file identified by the `CV` field value.

This allows the workflow to pass the resume file to the Gemini node for analysis.

### Step 4 --- Analyze the resume with AI

The Gemini 2.5 Flash model analyzes the resume according to the prompt specified in

the workflow.

The prompt asks the model to evaluate the candidate for the position of AI

Automation Engineer.

The requested information includes:

-  relevant technical skills,

-  automation tools,

-  AI/LLM experience,

-  professional experience,

-  automation projects,

-  integration skills,

-  problem-solving capabilities,

-  communication competencies,

-  documentation skills,

-  and role relevance.

The model is requested to provide a score from 0 to 100 with an explanation of the

reasoning, strengths, missing skills, and relevant projects.

### Step 5 --- Apply conditional logic

The workflow converts the returned value to a number and checks if it is greater

than 2 before proceeding to the next steps.

The conditional value of 2 is part of the currently exported workflow and should be

reviewed if this is intended to represent a shortlist threshold.

### Step 6 --- Update the candidate record

The workflow then updates the original Google Sheets record with the results of

the AI analysis.

It sets the following values:

``` text

Processed = Yes

Short_Listed = AI analysis

```

It also retains the timestamp, name, email, and CV for the candidate.

The update operation is performed using the timestamp as a unique identifier.

### Step 7 --- Send notifications

The workflow sends two types of notifications:

Gmail

A Gmail node sends an email with the subject of `Selected Candidate`.

WhatsApp

A Green-API WhatsApp node sends a message indicating that the resume has been

scanned.

------------------------------------------------------------------------

## 6. AI Prompt Design

One of the most important elements of this workflow is the design of the prompt sent

to the Gemini model.

The prompt does not ask the model to provide an unrestricted evaluation.

Rather, it specifies the target role and the information required for consideration.

The model is asked to evaluate the following:

``` text

Technical skills

Professional experience

Automation / AI experience

Projects

Problem-solving

Integration skills

Communication

Documentation

Role relevance

```

It is then requested to provide the following information:

``` text

Score

Short reason

Key strengths

Missing / weak skills

Relevant experience / projects

```

Finally, the model is instructed to base the evaluation only on information

explicitly provided in the resume.

This should prevent the model from assuming skills or experience not stated by

the candidate.

------------------------------------------------------------------------

## 7. Integrations

### n8n

The core automation orchestrator.

### Google Sheets

The candidate response and result tracking layer.

### Google Drive

The source of the submitted resume file.

### Gemini

The AI resume screening engine.

### Gmail

Email notification engine.

### Green-API / WhatsApp

WhatsApp notification engine.

------------------------------------------------------------------------

## 8. Technical Skills Demonstrated

This project demonstrates the following technical competencies:

### Workflow Automation

-  n8n

-  triggers

-  conditional branching

-  node connectivity

-  execution sequencing

### AI Automation

-  Gemini

-  prompt engineering

-  document analysis

-  score generation

-  grounded evaluation

### Google Workspace

-  Sheets

-  Drive

-  Gmail

### Data Handling

-  field mapping

-  expression parsing

-  spreadsheet updating

-  file identifiers

-  temporal matching

### Communication Automation

-  email notifications

-  WhatsApp alerts

### Integration Architecture

The ability to tie multiple disparate systems together into a unified business

process.

------------------------------------------------------------------------

## 9. Business Value

The automation provides value by reducing the amount of repetitive and time-

consuming tasks involved in the first-stage screening of job applications.

Rather than having a recruiter manually perform each action, the workflow handles:

-  retrieving the CV,

-  initial screening,

-  recording the outcome,

-  and sending notifications.

The recruiter can use the information generated by the workflow for further

consideration and additional actions.

------------------------------------------------------------------------

## 10. Error Handling & Production Improvements

The currently exported workflow serves as a working prototype but would benefit

from several production improvements before being used in a live environment.

### Processing State

The current processing state logic should be reviewed to ensure that processed rows

do not enter the processing pipeline a second time.

### Score Threshold

The current score threshold check only looks for values above 2.

Since the prompt asks for a 0-100 score, this should also be reviewed if the

intention is to use this as a shortlisting criterion.

### Structured AI Output

The currently captured AI output is stored as text within the `Short_Listed`

column.

In a production version, it would be better to capture this information using

structured fields such as:

``` text

Score

Summary

Strengths

Missing Skills

Relevant Experience

Recommendation Status

```

### Error Branches

The workflow could benefit from additional error handling such as:

-  missing CVs,

-  invalid file IDs,

-  Gemini failures,

-  malformed AI responses,

-  Google Sheets update errors,

-  and notification failures.

### Human Review

The AI analysis should be used as a recommendation rather than an absolute

selection or rejection criterion.

------------------------------------------------------------------------

## 11. Security & Privacy

Resume data often contains sensitive and personal information.

When publishing to a public GitHub repository:

-  remove API keys,

-  remove OAuth secrets,

-  remove access tokens,

-  remove passwords,

-  remove private environment variables,

-  avoid exposing private candidate records,

-  avoid publishing real candidate resumes,

-  sanitize screenshots,

-  use test/demo data.

The currently exported workflow includes credential references and configuration

identifiers that should also be reviewed before publication.

------------------------------------------------------------------------

## 12. Portfolio Demonstration

A simplified public demonstration could take the form of:

``` text

GitHub Repository

↓

README

↓

Workflow Architecture

↓

Sanitized n8n JSON

↓

Screenshots

↓

Live Demo / Test Form

```

This allows a reviewer to get a sense of the project without having to engage with a

larger frontend application.

------------------------------------------------------------------------

## 13. Project Outcome

The project demonstrates an end-to-end AI-powered automation workflow that follows

this general pattern:

``` text

Candidate Data

↓

Automated Trigger

↓

File Retrieval

↓

AI Analysis

↓

Conditional Logic

↓

Database/Sheet Update

↓

Multi-channel Notification

```

The value of the project lies not only in the use of the AI model itself but in the

ability to combine different tools together into a coherent automated process.

------------------------------------------------------------------------

## 14. Final Architecture

``` text

CANDIDATE

│

▼

GOOGLE FORM

│

▼

GOOGLE SHEETS

│

▼

┌──────────────────┐

│ n8n TRIGGER   │

│ Every Minute  │

└────────┬─────────┘

│

▼

STATUS CHECK

│

▼

┌──────────────────┐

│  GOOGLE DRIVE  │

│  Download CV  │

└────────┬─────────┘

│

▼

┌──────────────────┐

│ GEMINI 2.5 FLASH │

│ Resume Analysis  │

└────────┬─────────┘

│

▼

SCORE CHECK

│

┌────────┴─────────┐

▼         ▼

GOOGLE SHEETS     NOTIFY

UPDATE     ┌──────┴──────┐

▼       ▼

GMAIL    WHATSAPP

```

## Project Positioning

AI Resume Scanner is an AI recruitment assistant project that demonstrates the

integration of workflow automation, document processing, large language model

analysis, Google Workspace, conditional logic, data mapping, and multi-channel

notifications using n8n.