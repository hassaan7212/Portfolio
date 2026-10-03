# AI Resume Scanner --- n8n Automation

An AI-powered resume screening workflow automated with n8n, Google

Forms/Sheets, Google Drive, Gemini, Gmail, and WhatsApp (Green-API).

The workflow is set up to detect new submissions in a Google Sheet, download a CV from Google Drive, analyze it with Gemini, write the results back to the Sheet, and notify accordingly.

## 🚀 Workflow Overview

``` text

Candidate submits Google Form

↓

Google Sheets

↓

Google Sheets Trigger

↓

Check Status

↓

Download CV

from Google Drive

↓

Gemini 2.5 Flash Analysis

↓

Score / Evaluation

↓

Conditional Check

↙       ↘

Update Sheet   Notifications

├── Gmail

└── WhatsApp

```

## 🎯 Purpose

The purpose of this automation is to minimize the manual work required for initial resume screening.

Instead of manually checking every CV submission, this workflow:

- monitors the response spreadsheet,

- extracts the submitted CV,

- analyzes it with AI,

- scores the candidate for the position of AI Automation Engineer,

- writes the result back to Google Sheets,

- and sends appropriate notifications when the conditional rule is met.

## 🧩 Technologies & Integrations

-----------------------------------------------------------------------

Technology             Role

----------------------------------- -----------------------------------

n8n               Workflow orchestration and

automation

Google Forms / Google Sheets  Candidate submission and workflow

input

Google Drive          Resume/CV file retrieval

Gemini 2.5 Flash        AI resume analysis

Gmail              Candidate-selection notification

Green-API / WhatsApp      WhatsApp notification

Expressions           Data mapping between workflow nodes

Conditional logic        Processing and notification

decisions

-----------------------------------------------------------------------

## ⚙️ Workflow Nodes

### 1. Google Sheets Trigger

The automation begins with a Google Sheets Trigger set to "Poll sheets every minute".

The trigger watches the `Form Responses 1` sheet.

### 2. Check Status

An IF node checks the value of the `Processed` column.

The exported workflow has `contains "Yes"` as a condition.

> 🛠 Implementation note: If the intention is to send only unprocessed

> responses for analysis, this condition should be carefully reviewed

> before publishing the automation, since as it stands, it will send

> the "Yes" responses further down the workflow.

### 3. Download file

The workflow uses Google Drive to download the file specified in the `CV` column.

### 4. Analyze an image

The downloaded resume is analyzed with Gemini 2.5 Flash.

The prompt asks the model to score the candidate for the position of AI Automation Engineer based on their technical skills and tools, years of experience, expertise in automation and generative AI, projects, integrations, problem-solving, communication, and documentation abilities, and overall relevance to the post.

It also asks the model to provide a brief explanation of the score, strengths, weaknesses, and relevant projects and experience.

Moreover, the prompt instructs the model to only use the information from the resume, not make up any qualifications or experience.

### 5. Conditional Check

The workflow converts the Gemini response to a number and checks whether it is greater than 2.

If so, it proceeds to the "Notifications" nodes.

> 🛠 Implementation note: Since the resume prompt asks to score the

> candidate from 0 to 100, this condition would be virtually always true.

> The conditional logic should be adjusted depending on what score is

> considered shortlisted-worthy.

### 6. Update row in sheet

This node updates the original Google Sheets row with the analysis results.

It also marks the row as processed (`Processed` is set to "Yes").

The following data is written back to the sheet:

- `Processed`

- `Short_Listed`

- Timestamp

- Name

- Email

- CV

The row is matched using the Timestamp column.

### 7. Gmail Notification

A Gmail notification with the subject "Selected Candidate" is sent.

### 8. WhatsApp Notification

A WhatsApp message is sent via Green-API to notify that the resume was scanned.

## 🧠 AI Evaluation Prompt

The prompt used for the AI evaluator is tailored toward the position of AI Automation Engineer.

It includes a set of areas to be evaluated, such as:

- n8n

- Zapier

- Make

- AI / LLMs

- Claude Code

- APIs

- Webhooks

- CRMs

- Databases

- Google Workspace

- Automation projects

- Integration expertise

- Documentation and communication

Moreover, the prompt specifies that the evaluation should be based on the information provided in the resume and not make up any information.

This ensures that the AI only uses the data from the resume to score the candidate and identify their strengths and weaknesses.

## 🔄 Data Flow

The candidate-related data used by this automation consists of the following fields:

``` text

Timestamp

Name

Email

CV

Processed

Short_Listed

```

The `CV` field is used to extract the resume file from Google Drive.

Once the resume has been analyzed, the results are stored in the `Short_Listed` field, and `Processed` is set to "Yes".

## 📌 Example Use Case

A recruiting team gets dozens of applications for the position of AI Automation Engineer.

Instead of reviewing each resume manually, the team can use this automation to process the applications.

By setting up the Google Form for candidate applications, the automation will be triggered every time a candidate applies.

It will extract the candidate's resume, run the AI evaluation, update the spreadsheet with the results, and notify the team when a candidate is shortlisted.

This way, the initial screening of applications will be automated.

## 🔐 Credentials & Security

When publishing this project on a public repository such as GitHub, make sure to not expose any credentials.

In particular, do not publish:

- API keys

- OAuth client secrets

- Access/refresh tokens

- Passwords

- .env files

When publishing the workflow JSON, make sure to sanitize it and remove any private or sensitive data.

The published JSON represents your n8n public portfolio, so treat it with care.

## 🛠️ How to Import

1. Set up n8n locally or on a server.

2. Open the Workflows tab.

3. Click on "Import from file".

4. Select the JSON file.

5. Reconnect the necessary credentials.

6. Select the Google Sheets spreadsheet.

7. Set up Google Drive references.

8. Set up Gemini credentials.

9. Set up Gmail and WhatsApp credentials.

10. Test the workflow with a sample resume.

11. Review the conditional logic.

## 📸 Portfolio Demonstration

When demonstrating this automation for a portfolio or GitHub project, the following screenshots would be useful:

- n8n Workflow

- Google Form

- Google Sheets (before processing)

- Gemini Analysis node/prompt

- Google Sheets after processing

- Gmail Notification

- WhatsApp Notification

- n8n successful execution

## 📈 Skills Demonstrated

This project demonstrates the following skills:

- n8n automation / workflow design

- Trigger configuration (event/polling-based)

- Google Workspace (Sheets, Drive) integration

- Google Workspace file management

- AI/LLM integration

- Prompt engineering

- Conditional logic configuration

- Data mapping / expressions

- Spreadsheet automation

- Email automation

- WhatsApp automation

- Multi-service API orchestration

- Automation design, testing, and debugging

- Automation documentation

## ⚠️ Production Notes

This automation is intended for demonstration purposes only.

Before deploying it in a production environment, consider additional steps, including but not limited to:

- Adding additional checks to avoid duplicates

- Choosing an appropriate shortlisting threshold

- Structuring the AI response instead of storing it as one field

- Adding error handling / retry logic

- Adding validation for CV file existence

- Adding privacy checks for candidate data

- Logging / monitoring

- Adding manual checks before shortlisting

This project serves as an example of an automation and technical portfolio piece.

## 📄 Project Status

Type: AI Automation / Resume Screening

Platform: n8n

AI Model: Gemini 2.5 Flash

Input: Google Forms → Google Sheets

File Source: Google Drive

Outputs: Google Sheets + Gmail + WhatsApp

Use Case: Automated initial resume screening