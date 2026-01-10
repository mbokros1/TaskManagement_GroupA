# TaskManagement_A

Task Management System for Team A - NSC

## Development Setup

1. Clone the repo
2. Run `make build` to install dependencies and start container
3. Run `make fresh` when you install new npm dependencies
4. Access the frontend at `http://localhost:5173`

## Routing

The backend is accessible via a proxied route `/api`. All Express routes setup on the backend must be prefixed with `/api` as well.
