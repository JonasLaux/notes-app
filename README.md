# Notes-App

## Description
Notes-App is a project that includes a NestJS backend and Infrastructure as Code (IaC) using Terraform. The backend service provides functionality to create, read, update, and delete notes, with each note consisting of a title, content, and a user ID. The Terraform scripts are used to manage the necessary cloud infrastructure for the application.

## Folder Structure 
- `notes-app-backend`: This folder contains the NestJS backend application. It includes the source code for the Notes-App API, handling the logic for note management and interactions with the database. 
- `terraform`: Contains Terraform files that define the Infrastructure as Code (IaC) for deploying and managing the required cloud resources for the Notes-App.

## Production Preview
The production version of the Notes-App is hosted and can be accessed at [https://europe-west3-jonas-notes-app.cloudfunctions.net/notes-app-backend/](https://europe-west3-jonas-notes-app.cloudfunctions.net/notes-app-backend/) .

## API Documentation
The API documentation, detailing the available endpoints and how to interact with the Notes-App API, is available at [https://europe-west3-jonas-notes-app.cloudfunctions.net/notes-app-backend/api](https://europe-west3-jonas-notes-app.cloudfunctions.net/notes-app-backend/api)
