# TaskManagement_A

Task Management System for Team A - NSC

## Requirements

- Node / npm
- Docker

## Development Setup

1. Clone the repo
2. Run `npm run install-all` in the root to install dependencies
3. Run `npm run docker:up` to build and start frontend/backend/db containers
4. Access the frontend at `http://localhost:5173`

## Routing

The backend is accessible via a proxied route `/api`. All Express routes setup on the backend must be prefixed with `/api` as well.

### Backend API (Swagger UI):

`http://localhost:5050/docs/`

### Keycloak Admin Console：

`http://localhost:8080/`

Default admin credentials:

- Username: admin
- Password: admin
