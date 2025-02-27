# Testing Success Criteria for Todo App with Rating System

## Backend Functionality

### Authentication Endpoints
- [ ] **Register**: New users can register with email and password
  - Test: `curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}'`
  - Expected: Returns success response with limited token and refresh token

- [ ] **Login**: Registered users can log in
  - Test: `curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}'`
  - Expected: Returns success response with limited token, refresh token, and twoFactorEnabled flag

- [ ] **2FA Setup**: Users can set up two-factor authentication
  - Test: `curl -X POST http://localhost:5000/api/auth/setup-2fa -H "Authorization: Bearer <limited_token>" -H "Content-Type: application/json"`
  - Expected: Returns success response with QR code URL and secret

- [ ] **2FA Verification**: Users can verify 2FA code and get full access token
  - Test: `curl -X POST http://localhost:5000/api/auth/verify-2fa -H "Authorization: Bearer <limited_token>" -H "Content-Type: application/json" -d '{"token":"123456"}'`
  - Expected: Returns success response with full access token and refresh token

- [ ] **Token Refresh**: Users can refresh their tokens
  - Test: `curl -X POST http://localhost:5000/api/auth/refresh -H "Content-Type: application/json" -d '{"refreshToken":"<refresh_token>"}'`
  - Expected: Returns success response with new limited token and refresh token

### Todo Endpoints
- [ ] **Get All Todos**: Authenticated users can retrieve their todos
  - Test: `curl -X GET http://localhost:5000/api/todos -H "Authorization: Bearer <full_token>"`
  - Expected: Returns array of todos belonging to the authenticated user

- [ ] **Create Todo**: Authenticated users can create new todos
  - Test: `curl -X POST http://localhost:5000/api/todos -H "Authorization: Bearer <full_token>" -H "Content-Type: application/json" -d '{"text":"Test Todo","completed":false,"rating":0}'`
  - Expected: Returns the created todo with an ID

- [ ] **Get Todo by ID**: Authenticated users can retrieve a specific todo
  - Test: `curl -X GET http://localhost:5000/api/todos/<todo_id> -H "Authorization: Bearer <full_token>"`
  - Expected: Returns the specified todo

- [ ] **Update Todo**: Authenticated users can update a todo
  - Test: `curl -X PUT http://localhost:5000/api/todos/<todo_id> -H "Authorization: Bearer <full_token>" -H "Content-Type: application/json" -d '{"text":"Updated Todo","completed":true}'`
  - Expected: Returns the updated todo

- [ ] **Update Todo Rating**: Authenticated users can update a todo's rating
  - Test: `curl -X PUT http://localhost:5000/api/todos/<todo_id>/rating -H "Authorization: Bearer <full_token>" -H "Content-Type: application/json" -d '{"rating":4}'`
  - Expected: Returns the todo with updated rating

- [ ] **Delete Todo**: Authenticated users can delete a todo
  - Test: `curl -X DELETE http://localhost:5000/api/todos/<todo_id> -H "Authorization: Bearer <full_token>"`
  - Expected: Returns success message

### Security
- [ ] **JWT Validation**: Tokens are properly validated
  - Test: Access protected endpoint with invalid/expired token
  - Expected: Returns 401 Unauthorized

- [ ] **2FA Security**: Full access requires 2FA verification
  - Test: Try to access protected resources with limited token
  - Expected: Returns 401 Unauthorized for endpoints requiring full access

## Frontend Integration

### Authentication Flow
- [ ] **Register UI**: Users can register through the UI
  - Test: Fill out registration form and submit
  - Expected: Redirects to login page on success

- [ ] **Login UI**: Users can log in through the UI
  - Test: Fill out login form and submit
  - Expected: Redirects to 2FA verification if enabled, or to todo list if not

- [ ] **2FA Verification UI**: Users can verify 2FA code through the UI
  - Test: Enter 2FA code and submit
  - Expected: Redirects to todo list on success

- [ ] **Logout**: Users can log out
  - Test: Click logout button
  - Expected: Redirects to login page and clears tokens from localStorage

### Todo Management
- [ ] **Todo List Display**: Todos are displayed correctly
  - Test: Log in and view todo list
  - Expected: Shows all todos with their text, completion status, and rating

- [ ] **Add Todo**: Users can add new todos
  - Test: Enter text in the input field and submit
  - Expected: New todo appears in the list

- [ ] **Toggle Completion**: Users can toggle todo completion status
  - Test: Click checkbox next to a todo
  - Expected: Todo's completion status changes visually and persists after page refresh

- [ ] **Star Rating**: Users can rate todos with 0-5 stars
  - Test: Click on different star ratings for a todo
  - Expected: Star rating updates visually and persists after page refresh

- [ ] **Filter Todos**: Users can filter todos by status
  - Test: Click on filter buttons (All, Active, Completed)
  - Expected: List shows only todos matching the selected filter

- [ ] **Search Todos**: Users can search todos by text
  - Test: Enter search text in the search field
  - Expected: List shows only todos containing the search text

### Error Handling
- [ ] **API Error Handling**: Frontend gracefully handles API errors
  - Test: Disconnect backend while using the app
  - Expected: Shows appropriate error messages without crashing

- [ ] **Form Validation**: Forms validate input before submission
  - Test: Submit forms with invalid data
  - Expected: Shows validation errors and prevents submission

### Responsive Design
- [ ] **Mobile Responsiveness**: UI works well on mobile devices
  - Test: View app on different screen sizes
  - Expected: UI adapts to different screen sizes without breaking

## Cross-Cutting Concerns
- [ ] **Data Persistence**: Data persists across sessions
  - Test: Add/update todos, log out, and log back in
  - Expected: Changes are preserved

- [ ] **Performance**: App loads and responds quickly
  - Test: Navigate through different parts of the app
  - Expected: UI remains responsive with minimal lag

- [ ] **CORS**: Frontend can communicate with backend
  - Test: Make API requests from frontend to backend
  - Expected: Requests succeed without CORS errors
