Architectural Decisions & Key Concepts
Data-Driven UI: The frontend components are "dumb" and render dynamically based on a central questions.js configuration file. This fulfills the core requirement that adding new questions should not require code changes.

Separation of Concerns: The backend is professionally structured with models for data schemas and routes for API endpoint logic, keeping the main server.js file clean and focused on configuration.

State Management: The frontend uses React's useState hook to manage a simple state machine ('welcome', 'active', 'complete'), which is efficient and sufficient for this application's scope.

Robust Session IDs: We chose to use uuid over Date.now() to generate session IDs. This guarantees global uniqueness and avoids the potential for "collisions," making the application more robust and scalable, which is a professional best practice.
