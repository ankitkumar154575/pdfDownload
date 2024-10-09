2. Table of Contents

    Introduction
    Background
    Objectives
    Requirements
    Architecture Overview
    Detailed Design
    Technology Stack
    Security Considerations
    Testing and Validation
    Deployment Strategy
    Maintenance and Support
    Timeline and Milestones
    References
    Appendices

3. Introduction

This document outlines the design for an Angular project that provides a user interface for fetching and displaying work item details, notes, attachments, and audit history based on a given Item ID. The application allows users to download selected data in PDF format.
4. Background

The project aims to streamline the retrieval of work item information from a backend service and provide users with an intuitive interface for managing that information.
5. Objectives

    To create a user-friendly Angular application.
    To fetch detailed information based on the Item ID.
    To provide options for users to download selected data in PDF format.

6. Requirements
Functional Requirements:

    A text input for entering the Item ID.
    A "Fetch Data" button that triggers the data retrieval process.
    A popup displaying fetched data with checkboxes for the following sections:
        Work Item Details
        Work Item Notes
        Work Item Attachments
        Work Item Audit History
    A download button in the popup that allows users to download the selected data in PDF format.

Non-functional Requirements:

    The application should be responsive and work on various devices.
    The application should have a loading indicator while fetching data.
    Proper error handling and user notifications for failed data retrieval.

Constraints:

    The application should communicate with a RESTful API to fetch data.
    The PDF generation should be handled client-side.

7. Architecture Overview

The application architecture will consist of the following components:

    Frontend: Angular application with components for data input, display, and PDF generation.
    Backend: RESTful API that returns data based on the Item ID.

High-Level Architecture Diagram (Include a diagram here)
8. Detailed Design
8.1 Components

    Input Component:
        Text input for Item ID
        "Fetch Data" button
    Popup Component:
        Displays the fetched data in categorized sections
        Checkboxes for selecting which sections to include in the PDF
        Download button

8.2 Data Models

    Work Item Details:
        Cosmic Work Item:
            Item Id
            Item Date
            Sending Bank
            Step
            Owner
            Parent Case Id
            Sharing Category
            Business Unit
            Type of Risk
        Cosmic Case Item:
            Type of Risk
            Closed Date
            Sending Bank
            Receiving Bank
            Red Flags Identified
            State
            Focus Name
            Focus Id
            Business Unit
            Sharing Category
            Comm Type
            Direction from Citi
            Mas Cosmic Id
        Summary:
            Type of Risk
            Sharing Category
            Red Flags Identified
            Sending Bank
            Receiving Bank
            Mas Cosmic Id
        Telephone Number:
            Telephone Type
            Country Code
            Area Code
            Phone Number
        Address:
            Structured
            Address Type
            Country Code
            Postal Code
            City
            Street Name
            Building Name
            Floor
        Entity Accounts:
            Account Number
            Account Type
            Account Open
            Account Status
            Account Closure Date
        Transaction:
            Transaction Reference Id
            Transaction Date
            Originator Name
            Originator Account Number
            Originator Bank Name

    Work Item Notes:
        Note Date
        Entered By
        Related Action
        Note

    Work Item Attachments:
        File Name
        Attach Date
        Size (KB)
        Attached Flag

    Work Item Audit History:
        Date
        Action
        Performed By
        History Line

8.3 API Endpoints

    GET /api/items/{itemId}: Fetch work item details based on Item ID.

8.4 PDF Generation

Utilize a library like jspdf to create PDF documents based on user selections from the popup.
9. Technology Stack

    Frontend: Angular, TypeScript, HTML, CSS
    Libraries: Bootstrap for styling, jsPDF for PDF generation
    Backend: Node.js/Express (for RESTful API), MongoDB (optional for data storage)

10. Security Considerations

    Validate user input to prevent injection attacks.
    Implement secure communication (HTTPS) between the frontend and backend.
    Ensure proper authentication and authorization mechanisms.

11. Testing and Validation

    Unit tests for components and services.
    Integration tests for API communication.
    User acceptance testing to validate requirements.

12. Deployment Strategy

    Deploy the Angular application to a cloud service (e.g., AWS S3, Azure Blob Storage).
    Use CI/CD tools (e.g., GitHub Actions, Jenkins) for automated deployment.

13. Maintenance and Support

    Documentation for maintenance and future updates.
    A support channel for users to report issues or request features.

14. Timeline and Milestones
Milestone	Target Date
Requirements Gathering	[Date]
Design Phase Completion	[Date]
Development Completion	[Date]
Testing Phase Completion	[Date]
Deployment	[Date]
15. References

    Angular documentation
    jsPDF documentation
    RESTful API design principles

16. Appendices

    Additional diagrams, charts, or relevant information.