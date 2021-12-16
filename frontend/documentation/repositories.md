# Repositories

**Definition**: "Repositories," as named by the [repository pattern](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design), are "components that encapsulate the logic required to access data sources."

**Purpose**: In our app, they encapsulate the frontend logic required to interact with the activity and activity type data sources.

**Location**: The repositories can be found in [src/repositories](../src/repositories).

## ActivityRepository

The [`ActivityRepository`](../src/repositories/ActivityRepository.js) provides interaction with the activity data source via the REST API. In essence,
it provides an abstraction layer around the API.

## ActivityTypeRepository

The [`ActivityTypeRepository`](../src/repositories/ActivityTypeRepository.js) provides interaction with the activity type data source via the REST API. In essence,
it provides an abstraction layer around the API.
