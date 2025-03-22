# Performance Testing Report

## Evidence of System Responsiveness

We build a JMeter testing suite for testing responsiveness of our backend. The tests were conducted simultaneously with the backend database populated with a significant amount of data.

### Part 1: Simple GET Request (Less Work-Intensive)
This test focused on a simple GET route that involved fetching user listings without intensive processing.

| Label          | Number of Samples | Avg Response Time (ms) | Min Response Time (ms) | Max Response Time (ms) | Std. Dev. (ms) | Error % | Throughput (req/sec) | KB/sec Received | KB/sec Sent | Avg Bytes |
|----------------|-------------------|------------------------|------------------------|------------------------|----------------|---------|-----------------------|-----------------|-------------|-----------|
| HTTP Request   | 15,500             | 5381                   | 78                     | 16,040                 | 2263.61         | 0.000%   | 44.84                 | 115.38           | 48.53        | 2634.8     |

### Part 2: Custom Sorting & Auto-Suggestion (Work-Intensive)
This test focused on complex backend operations involving custom sorting and auto-suggestions, which are very work-intensive processes.

| Label          | Number of Samples | Avg Response Time (ms) | Min Response Time (ms) | Max Response Time (ms) | Std. Dev. (ms) | Error % | Throughput (req/sec) | KB/sec Received | KB/sec Sent | Avg Bytes |
|----------------|-------------------|------------------------|------------------------|------------------------|----------------|---------|-----------------------|-----------------|-------------|-----------|
| HTTP Request   | 500                | 6695                   | 178                    | 13,382                 | 4610.82         | 0.000%   | 12.41                 | 4.96             | 14.25        | 409.0      |

### System Behavior Under Different Loads
- The performance difference between the two routes is significant, with Part 2 being much more intensive on the backend due to the complex operations.
- The throughput for Part 2 is significantly lower than Part 1, highlighting the impact of computationally expensive operations.
- No errors were detected during the tests, indicating a stable backend but a potential need for 
  optimization in high-workload scenarios if real workload exceeds the simulated one which is 
  unlikely.

## Security Measures & Testing

### Authentication & Authorization
- The system uses **Bearer tokens (Firebase authentication)** to validate users before processing requests.
- Tokens are properly verified using `admin.auth().verifyIdToken(token)` to ensure requests are authenticated.
- No backend routes that could pose security risks are allowed to be made without authentication.

### Data Protection Mechanisms
- We do not suffer from SQL injection as we use safe mongoose request for access to our database.
- We protect sensible data, like user passwords, with https requests.
- User inputs are validated and properly sanitized to prevent **NoSQL Injection**.
- Web Application Firewalls (WAF) are recommended for an additional layer of security.

### Results of Security Tests
- NoSQL Injection tests confirmed that the backend is safe against common attack patterns by validating user inputs before making database queries.
- Proper authorization mechanisms are in place to protect private endpoints.

## Scalability & Availability Considerations

### System Scalability
- The backend demonstrates a reasonable ability to handle concurrent requests, but the 
  throughput significantly drops when the number of requests is very high.
  - Generally it seems to be scalable to our intended real-world use.
- Implementing **Caching (Redis or Memcached)** for frequently requested data would improve scalability.
- Load balancing could be implemented to distribute incoming requests evenly.

### Deployment Strategy & Uptime
- The backend is deployed on a server capable of handling moderate loads, but cloud deployment with autoscaling capabilities would be ideal for higher availability.
- Uptime monitoring using services like **UptimeRobot or Prometheus/Grafana** is recommended to ensure maximum availability.

## Conclusion
- The system shows good performance under loads but could benefit from improved 
  scalability measures like more capable servers hosting the backend.
- The security mechanisms in place are effective against common attacks but should be continuously monitored and updated.

