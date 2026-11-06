# Student Marketplace frontend

React single-page frontend built with Vite. Marketplace and authentication requests use the `/api` path.

## Run locally

1. Start the backend API. By default, the frontend expects it at `http://localhost:8080`.
2. Install frontend dependencies with `npm install`.
3. Start the frontend with `npm run dev`.

Vite proxies `/api` requests to the backend during development, avoiding browser CORS issues. To use a different backend address, set `BACKEND_URL` in a local `.env` file (see `.env.example`) and restart Vite.

For deployments, set `VITE_API_BASE_URL` to the API's public base URL, including `/api` (for example, `https://example.com/api`). If unset, requests use `/api` on the same origin as the frontend, which requires the production web server to proxy that path to the backend.

## Moderation and student feedback API

The backend must authorize these operations by the authenticated user's role; frontend role checks are only for presentation.

- `DELETE /admin/users/{userId}` removes a user. The admin user list refreshes locally after a successful response.
- `GET /items/{itemId}/reviews` returns reviews with `id`, `rating`, `comment`, and optional `reviewer.fullName`. `POST /items/{itemId}/reviews` accepts `{ "rating": 1, "comment": "..." }` and returns the created review.
- `POST /reports` accepts `{ "targetType": "ITEM" | "SELLER", "targetId": "...", "reason": "..." }` for student reports about suspicious products or sellers.
- `GET /admin/reviews` and `GET /admin/reports` return arrays of submitted reviews and reports for the administrator's Reviews & reports page. Each endpoint can also return an object containing a `reviews` or `reports` array.

## Checks

- `npm run lint`
- `npm run build`
