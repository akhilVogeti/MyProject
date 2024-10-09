# Sample Project - Task Manager

A full stack dockerised application with NestJS+TypeScript & MongoDB in the backend, React+TypeScript with JoyUI in the frontend to help registered users perform CRUD operations on tasks.

## How to run

1. Clone the repository and move into the project directory.

   ```
   git clone https://github.com/akhilVogeti/MyProject
   cd MyProject
   ```

2. Run the application using Docker

   ```
   docker-compose up
   ```

3. Open browser with the following url to use the app.
   ```
   localhost:5173/
   ```

## Backend APIs

1. `POST /auth/register` : Users can register with username and password.
2. `POST /auth/login` : Users can login after registration. On success, it returns a token, which is stored in the localStorage of the browser. It is the sent with every other request.
3. `GET /tasks` : All the tasks of the user are returned.
4. `GET /tasks/:taskId` : Fetches a particular task with id same as the taskId sent as a parameter in the URL.
5. `POST /tasks` : A new task is created whose data is sent in request body.
6. `PUT /tasks/:taskId` : Update task. The task data is sent in the request body.
7. `DELETE /tasks/:taskId`: Delete the task with id same as the taskId sent in the URL as parameter.

## Frontend URLs

1. `localhost:5173/` : A home page with login form to login.
2. `localhost:5173/register `: Registration page with register form.
3. `localhost:5173/dashboard`: After successful login, the user gets to see his tasks, edit/delete them. Add new tasks. All in this dashboard page.
