# Rappel

An idea management tool, inspired from kanban boards and integrated with GitHub

This repo only contains the frontend for the app. Please check [sdabhi23/rappel](https://github.com/sdabhi23/rappel)

## Features

- Automatically sync your GitHub repos
- Sort the repos into 5 categories:
  1. Backlog
  2. Active
  3. Work In Progress
  4. Done
  5. Archive
- Add working notes for the repos directly inside their cards

## Roadmap

- Add notes for new ideas
- Filter repos
- Search repos
- Hide stale repos into a separate tab
- Automatically delete repos when they are deleted from GitHub
- Integration with PyPI and NPM
- Integration with GitLab

## Run locally

- Install dependencies

  ```bash
  ➜ npm install
  ```

- Run the app locally

  ```bash
  ➜ npm start
  ```

The api docs should be available at <http://localhost:8000/api/schema/redoc/>

## Screenshots

- Homepage

  ![homepage](screenshots/home.png)

- Authorize GitHub

  ![onboard](screenshots/onboard.png)

- GitHub Callback

  ![onboard callback](screenshots/onboard-callback.png)

- Dashboard

  ![dashboard](screenshots/dashboard-repos.png)

## License

```
Copyright 2021 Shrey Dabhi

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
