const linearMocks ={
    getUser: {
        "active": true,
            "admin": true,
            "createdAt": "2023-09-13T23:54:01.804Z",
            "createdIssueCount": 0,
            "displayName": "jane.doe",
            "email": "jane.doe@friggframework.com",
            "guest": false,
            "id": "guid-123",
            "inviteHash": "123456789",
            "isMe": true,
            "lastSeen": "2024-01-05T19:29:53.694Z",
            "name": "Jane Doe",
            "timezone": "America/New_York",
            "updatedAt": "2023-09-13T23:54:03.711Z",
            "url": "https://linear.app/lefthook-app-dev/profiles/jane.doe",
            assignedIssues: function () {
            return {
                nodes: [{
                    "autoClosedAt": "2024-03-22T12:52:30.295Z",
                    "boardOrder": 0,
                    "branchName": "janedoe/lef-1-welcome-to-linear",
                    "canceledAt": "2024-03-22T12:52:30.282Z",
                    "createdAt": "2023-09-13T23:54:01.804Z",
                    "customerTicketCount": 0,
                    "description": "Hi there. Complete these issues to learn how to use Linear and discover ✨**ProTips.** When you're done, delete them or move them to another team for others to view.\n\n### **To start, type** `C` to **create your first issue.**\n\nCreate issues from any view using `C` or by clicking the `New issue` button.\n\n \n\n[1189b618-97f2-4e2c-ae25-4f25467679e7](https://uploads.linear.app/fe63b3e2-bf87-46c0-8784-cd7d639287c8/532d146d-bcd6-4602-bf1f-83f674b70fff/1189b618-97f2-4e2c-ae25-4f25467679e7)\n\nOur issue editor and comments support Markdown. You can also: \n\n* @mention a teammate\n* Drag & drop images or video (Loom & Youtube embed automatically)\n* Use emoji ✅",
                    "id": "7f65601a-dc6a-4c01-acda-9f5ae3b2761f",
                    "identifier": "LEF-1",
                    "number": 1,
                    "previousIdentifiers": [],
                    "priority": 2,
                    "priorityLabel": "High",
                    "sortOrder": -6663,
                    "title": "Welcome to Linear 👋",
                    "updatedAt": "2024-03-22T12:52:30.301Z",
                    "url": "https://linear.app/lefthook-app-dev/issue/LEF-1/welcome-to-linear-👋",
                    "_assignee": {
                        "id": "guid-123"
                    },
                    "_state": {
                        "id": "e371ba28-cd14-477e-bc77-6a58502ffa56"
                    },
                    "_team": {
                        "id": "fd60fe4a-6da6-4310-8a81-b3e2dcd327bb"
                    }
                },
                    {
                        "autoClosedAt": "2024-03-22T12:52:30.334Z",
                        "boardOrder": 0,
                        "branchName": "janedoe/lef-2-try-3-ways-to-navigate-linear-command-line-keyboard-or-mouse",
                        "canceledAt": "2024-03-22T12:52:30.329Z",
                        "createdAt": "2023-09-13T23:54:01.804Z",
                        "customerTicketCount": 0,
                        "description": "`Cmd/Ctrl` `K` **is our most powerful feature.** \n\nUse it to search for or take any action in the app.\n\n[cf798178-b3bc-4ae1-b24f-577d4871ae5d](https://uploads.linear.app/fe63b3e2-bf87-46c0-8784-cd7d639287c8/f477604b-f0d2-4ade-8a7a-571830a3b5de/cf798178-b3bc-4ae1-b24f-577d4871ae5d)\n\nIf you prefer to use a mouse, right click over any issue for **contextual menus**. They're a great way to learn the keyboard shortcuts, too.\n\n![CleanShot 2023-07-10 at 16.03.57.png](https://uploads.linear.app/fe63b3e2-bf87-46c0-8784-cd7d639287c8/11668d24-67e7-431d-9c7d-4bb5f409cae8/650d277b-cc1e-498b-aabd-8d04e8f57680)\n\nIf you prefer **keyboard shortcuts**, type `?` to view our full list.",
                        "id": "69231a60-4db3-42f4-965e-9ca9ebb83a42",
                        "identifier": "LEF-2",
                        "number": 2,
                        "previousIdentifiers": [],
                        "priority": 3,
                        "priorityLabel": "Medium",
                        "sortOrder": -7633,
                        "title": "Try 3 ways to navigate Linear: Command line, keyboard or mouse",
                        "updatedAt": "2024-03-22T12:52:30.339Z",
                        "url": "https://linear.app/lefthook-app-dev/issue/LEF-2/try-3-ways-to-navigate-linear-command-line-keyboard-or-mouse",
                        "_assignee": {
                            "id": "guid-123"
                        },
                        "_state": {
                            "id": "e371ba28-cd14-477e-bc77-6a58502ffa56"
                        },
                        "_team": {
                            "id": "fd60fe4a-6da6-4310-8a81-b3e2dcd327bb"
                        }
                    }]
            }
        }
    },
    getProjects: [{
        "color": "#bec2c8",
        "completedIssueCountHistory": [],
        "completedScopeHistory": [],
        "createdAt": "2024-03-28T16:15:59.002Z",
        "description": "Do a thing",
        "id": "b0cff847-8a94-4ecd-99dc-906093222f3d",
        "inProgressScopeHistory": [],
        "issueCountHistory": [],
        "name": "Sample Project",
        "progress": 0,
        "scope": 0,
        "scopeHistory": [],
        "slackIssueComments": true,
        "slackIssueStatuses": true,
        "slackNewIssue": true,
        "slugId": "1a700ac002e5",
        "sortOrder": 46.86,
        "state": "backlog",
        "updatedAt": "2024-03-28T16:15:59.002Z",
        "url": "https://linear.app/lefthook-app-dev/project/sample-project-1a700ac002e5",
        "_creator": {
            "id": "0c0a351a-61b3-4720-90d1-809165512020"
        }
    }]
}

module.exports = linearMocks