---
mode: 'agent'
---

# 📋 WORKFLOW CHECKLIST

> ⚠️ **ALWAYS FOLLOW THESE STEPS IN ORDER FOR EACH NEW TASK**

1. ✅ Check if workspace is initialized as git repository, if not initialise locally and create in GitHub
2. ✅ Assign Jira ticket to user and change state to "in progress"
3. ✅ Create branch locally with the Jira issue ID
4. ✅ Make code changes locally (small, frequent commits mandatory)
    - Do what's in the Jira ticket, and nothing else. Assume there are other tickets to cover additional tasks. If not, create them.
    - Prefer 20 commits per day with small incremental changes rather than one large commit with lots of changes.
    - Always use absolute paths when navigating the file system.
    - Use devlib packages where appropriate, and ask if unsure.
    - Reduce third-party libraries and packages to keep dependencies light.
    - Ensure code is clean, concise, well-documented, and follows best practices.
    - Ensure maximum test coverage and modularity.
5. ✅ Run all relevant tests before completion
6. ✅ Create PR in GitHub and link to Jira ticket
6. ✅ When I confirm the PR is good, update Jira with detailed description and mark as "done"

If any of these steps fail do not proceed with the task.

# General Guidelines

Always ensure that your responses are in the style of a professional software engineer. Use clear, concise language and provide detailed explanations when necessary. Avoid using overly casual language or slang. Focus on providing accurate and helpful information, and structure your responses logically. If you reference code, ensure it is well-formatted and easy to read. Always consider best practices in software development when providing solutions or advice.

When discussing code, always ensure that you provide a clear explanation of the code and its purpose. Use comments to explain complex logic or important decisions made in the code. Ensure that the code is well-structured and follows best practices for readability and maintainability. Also ensure that all code is documented well.

# Key Resources

- **GitHub Owner**: Whenever referring to GitHub always default to the alan-kelly-maersk owner.
- **DevLib**: To integrate our developer library, read `/docs/public/devlib` in `Maersk-Global/devex-support` Github repo
- **Retina**: Our in-house Kafka platform: Read `/docs/public/retina` in `Maersk-Global/devex-support` Github repo
- **MDP**: The Maersk Developer Platform is our delivery and hosting platform: Read `/docs/public/mdp` in `Maersk-Global/devex-support` Github repo
- **Coding Guidelines**: We have more guidance on coding here: read `/docs/public/handbook` in `Maersk-Global/devex-support` Github repo

# Task Workflow Details

## Project Management

- **Jira Project**: For this project, all Jira issues are stored in epic NBLMNT-342. When assigning issues in Jira use `Alan Kelly (alan.kelly@maersk.com)` as an assignee, not `vanilla`.
- **Task Breakdown**: When discussing the structure of a project, break down the required work into small manageable tasks that can be easily picked up and completed in isolation. All tasks should be clearly defined with a specific goal in mind and should include acceptance criteria to ensure that the task is complete and meets the requirements.
- **Never** start working on a Jira issue that has a status of 'done'

## Starting Work on a Task

- **Git Repository**: Before starting an activity, check that the current workspace is initialized as a git repository.
- **Jira Ticket Management**: When starting a new activity with a Jira ticket, assign the ticket to me and change its state to "in progress" using the Atlassian MCP server.
- **Branch Creation**: When starting a new issue, create a branch locally with the issue ID from Jira.

## Making Code Changes

- **Git Configuration**: If you need a PAT for GitHub to access private nuget packages, I have it configured in the GITHUB_PAT environment variable.
- **Local Changes**: Make all code changes locally before pushing to GitHub.
- **Commit Strategy**: Keep changes small and frequent where possible. This allows for easier review and testing, and helps to maintain a stable codebase. Prefer 20 commits per day with small incremental changes rather than one large commit with lots of changes.
- **File System Navigation**: Whenever navigating the file system always use absolute paths, as you often lose track of the current working directory.
- **Quality Assurance**: Run all relevant tests before completing an activity and ensure they pass.

## Coding Standards

- **Dotnet Version**: Use .NET 9 for all new projects.
- **Java Version**: Use Java 24 for all new projects.
- **Go Version**: Use Go 1.24 for all new projects.
- **DevLib Usage**: When creating code always ensure you use devlib packages where appropriate. If you are unsure if a devlib package exists, please ask.
- **Dependencies**: Reduce the amount of third party libraries and packages being imported to keep dependencies light. Ask before using a third party library.
- **Code Quality**: Keep the code as clean and concise as possible.
- **Documentation**: Ensure code is properly commented and follows the conventions of the programming language being used.
- **Test Coverage**: Ensure there is as much test coverage as possible, and that the code is modular and maintainable.
- **Frontend Monitoring**: All frontends will be integrated with Realtime User Monitoring (RUM), example here: https://github.com/Maersk-Global/devbridge/blob/master/frontend/src/modules/telemetry.ts

## Containerization

- **Docker Requirement**: All new services must be accompanied by an appropriate Dockerfile because all services will run on a containerized infrastructure. Note: I use podman, not docker.
- **Deployment Scope**: Your responsibility ends with pushing an image to Harbor, MDP will take care of the deployment aspect.

## Completing Work

- **Jira Updates**: When completing an activity or task, ensure there is a detailed description of what was done in the Jira ticket and change its status to "done" using jira_transition_issue instead of jira_update_issue.
- **Pull Requests**: Create a pull request in GitHub and update the Jira ticket with a reference to the pull request in GitHub that contains the changes.

# Project-Specific Guidelines

When discussing the DevBridge project, always refer to it as a reference implementation that demonstrates best practices in software development, including API handling, messaging, and database handling. Emphasize its role in bridging the gap between developers and platform teams, and its potential to serve as a learning resource for developers.
