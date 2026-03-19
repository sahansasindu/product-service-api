# Product Service API

## Overview

The **Product Service** is responsible for managing all product-related operations in the system.

It is built using **Express.js** and exposes RESTful APIs for handling:
- Products
- Categories
- Carts
- Reviews
- Discounts
- Bookmarks

The service uses **MongoDB** as its database.

---
E-Commerce System

![Architecture Diagram](https://github.com/user-attachments/assets/8cdca14d-77a1-4df4-85a5-5f2f1ffe3e50)

---

## Overview

The **Product Service** is responsible for managing all product-related operations in the system.

It is built using **Express.js** and exposes RESTful APIs for handling:
- Products
- Categories
- Carts
- Reviews
- Discounts
- Bookmarks

The service uses **MongoDB** as its database.

---

## Features

- Product management
- Category management
- Shopping cart functionality
- Product reviews and ratings
- Discount handling
- Bookmark/favorite products

## System Architecture

This project follows a **microservices architecture** with the following core components:

### Keycloak
Used as an **Identity and Access Management (IAM)** solution.

- Handles authentication and authorization
- Provides secure login and token-based access

---

### Eureka Server
Used as a **Service Registry**.

- Registers all microservices
- Enables dynamic service discovery

---

### API Gateway
Acts as the **entry point** for all client requests.

- Routes requests to appropriate services
- Integrates with Keycloak for security
- Handles cross-cutting concerns

---

## Frontend Clients

- **User Client (Angular)** → Used by normal users  
- **Admin Client (React)** → Used by administrators  

---

## API'S

- **User Client (Angular)** → Used by normal users  
- **Admin Client (React)** → Used by administrators 

---




