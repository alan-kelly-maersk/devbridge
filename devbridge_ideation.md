Problem Statement: we don't have a good reference for developers to build code that adheres to our governance and follows good industry practices. Documentation can quickly fall out of date, so we need a live system that demonstrated concepts like observability, authentication, websockets, APIs, messaging, database handling etc. We will call this system DevBridge, because it bridges the gap between application developers and platform teams.

Due to the diverse nature of software development in a large organisation DevBridge will need to demonstrate core concepts across different languages including Typescript (for frontend), Java, C# and Go (and probably Python in the future). It will be comprised of multiple services which will be deployed through MDP - so you only need to be involved to the point of creating a CI workflow that pushes an image to Harbor.

All code must be accompanied by unit testing and checked for code smells. Below is some more information about each component:

- API specification
The API specification will be common to all backend services and be used by the frontend. There need to be endpoints to send messages, retrieve messages, a websocket connection for real-time updates to the browser, file upload and file download. APIs will return standard responses and RFC 7807 problem details if an error occurs.
- Message schema
The schema for messages will be AVRO format, and all messages will be sent to a single topic so if we have different message types we will need to add a field to the schema to cater for this.
- Database schema
The database will be postgresql so schema should be compatible, complete with migrations mechanism to handle changes over time. There will be a single PostgreSQL schema shared by all the backend services.

- Frontend
The frontend will be built in vanilla Typescript. We may extend this to cover frameworks like React and Vue later on, but for now let's keep it simple.
1. It will allow users to "send a message" (call an API) to one of the backends available. It will then establish a websocket connection to the same backend service to get notifications when the message has been saved into the database.
2. It will also allow users to upload a file to demonstrate the Claim Check pattern - the file will be uploaded and stored in the local file system for now (blob storage is coming to MDP soon), then a message will be sent to Retina with a link to the file. When the processing is finished a message will be sent back to the websocket channel so that the user can see the download link.
3. Users will be able to view all messages in the database, and all files that have been uploaded.
4. There will also be a frontend for the API specification to allow developers to see the capabilities.

- Backend services:
DevBridge will have backend services in Java, Go and .NET that all conform to the same API specification. The user will choose a backend to use and be able to call an API endpoint on that backend. The backend will publish the API payload to a topic in Retina. Each backend will also be a consumer in a consumer group for the same topic. One will receive the message, extract the payload, add a field to describe which backend received it, then store it in the database. Users can then retrieve the messages in the database and display them in the frontend.
All backend services will need OIDC authentication, with the exception of metrics and health check endpoints.

All services will be containerised so need a Dockerfile and CI workflow to generate an image and push it to Harbor. Example workflows can be found [here](https://github.com/Maersk-Global/devbridge/tree/master/.github/workflows) and should be used as templates.

Let's first carry out ideation and shape the stories for this project. Bear in mind there could be 10 people working on this so the stories need to be quite granular, so that they can be completed relatively quickly. Stories should not overlap to avoid potential merge conflicts, common tasks like API specification that will be shared across the backend services (and frontend) should be prioritised as foundational work.

Ask questions as you go, don't guess - and I will refine these instructions with the answers. Before creating any issues in Jira, create a file in this workspace that lists all the stories and their acceptance criteria, in order of dependency, then once agreed we will batch create them in Jira. This file will also act as a local 'cache' of what's in Jira so that we don't have to use MCP so much, which slows things down.
