# TaskManagement_A

Task Management System for Team A - NSC

## Development Setup

1. Clone the repo
2. Run `npm run install-all` in the root to install dependencies
3. Run `npm run docker:up` to build and start frontend/backend/db containers
4. Access the frontend at `http://localhost:5173`

## Routing

The backend is accessible via a proxied route `/api`. All Express routes setup on the backend must be prefixed with `/api` as well.
