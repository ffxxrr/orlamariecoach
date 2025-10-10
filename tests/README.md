# Tests Directory

This directory contains all test files for the project including unit tests, integration tests, and end-to-end tests.

## Structure

```
tests/
├── unit/                    # Unit tests
│   ├── components/          # Component unit tests
│   ├── utils/              # Utility function tests
│   ├── hooks/              # Custom hook tests
│   └── lib/                # Library function tests
├── integration/            # Integration tests
│   ├── api/                # API endpoint tests
│   ├── database/           # Database integration tests
│   └── analytics/          # Analytics integration tests
├── e2e/                    # End-to-end tests
│   ├── user-flows/         # Complete user journey tests
│   ├── booking-flow/       # Booking process tests
│   ├── course-browsing/    # Course interaction tests
│   └── analytics-tracking/ # Analytics tracking tests
├── fixtures/               # Test data and fixtures
├── helpers/                # Test utility functions
└── performance/            # Performance tests
    ├── load-testing/       # Load test scenarios
    └── analytics-performance/ # Analytics performance tests
```

## Testing Strategy

### Unit Tests
- Test individual functions and components in isolation
- Mock external dependencies
- Focus on logic and edge cases
- Target 90%+ code coverage

### Integration Tests
- Test component interactions
- Database operations
- API endpoint functionality
- Analytics data flow

### End-to-End Tests
- Complete user workflows
- Cross-browser compatibility
- Mobile responsiveness
- Analytics tracking verification

### Performance Tests
- Page load speed
- Analytics impact measurement
- Database query optimization
- Mobile performance validation

## Test Configuration

### Framework Selection
- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing
- **Artillery**: Load testing

### Test Database
- Separate test database instance
- Automated test data setup and teardown
- Isolated test environments

### Analytics Testing
- Mock analytics tracking in tests
- Verify tracking events without external calls
- Test privacy compliance features
- Validate data accuracy

## Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:coverage

# Run analytics-specific tests
npm run test:analytics
```

## Test Guidelines

### Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### Mock Strategy
- Mock external APIs and services
- Use test doubles for database operations
- Avoid mocking internal modules unnecessarily

### Test Data
- Use factories for generating test data
- Clean up test data after each test
- Use realistic but anonymized data

### Continuous Integration
- Run tests on every commit
- Block merges on test failures
- Generate coverage reports
- Test multiple environments
