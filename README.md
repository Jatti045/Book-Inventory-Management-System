Book Inventory Management System
This repository contains a Book Inventory Management System created as part of a design challenge. The system allows users to add new books, filter existing books based on various criteria, and export book data.

Table of Contents
Project Overview
Requirements
Setup Instructions
1. Clone the Repository
2. Install Required Libraries
3. Set Up the MySQL Database
4. Configure Environment Variables
5. Start the Backend Server
6. Frontend Configuration
Usage
Troubleshooting
Project Overview
This Book Inventory Management System allows users to:

Add new books to an inventory.
Filter books based on title, author, genre, and publication date.
Export book data for external analysis.
The backend is developed in Java with MySQL for database management, and the frontend is built using React.

Requirements
Java JDK 8 or higher
MySQL server
Internet connection (for downloading dependencies)
Gson library - for JSON handling in Java
MySQL Connector/J - for connecting to MySQL
Dotenv Java - for loading environment variables
Setup Instructions
1. Clone the Repository
First, clone this repository to your local machine:

bash
Copy code
git clone https://github.com/Jatti045/Book-Inventory-Management-System.git
cd Book-Inventory-Management-System
2. Install Required Libraries
You need to add the following libraries to your project:

Gson (for JSON parsing)
Download Gson 2.8.8.
Place the JAR file in your lib folder in the project.
MySQL Connector/J (for MySQL database connectivity)
Download MySQL Connector/J 9.1.0.
Add it to the lib folder.
Dotenv Java (for managing environment variables)
Download Dotenv Java 3.0.0.
Place it in the lib folder.
Ensure all these libraries are added to your project's build path.

3. Set Up the MySQL Database
Create the Database: Open your MySQL client and create the book_inventory_management_system database:

sql
Copy code
CREATE DATABASE IF NOT EXISTS book_inventory_management_system;
Create the Table: Run the following SQL command to create the Inventory table with the required columns:

sql
Copy code
USE book_inventory_management_system;

CREATE TABLE Inventory (
    entry_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    publication_date DATE,
    isbn VARCHAR(20) UNIQUE
);

4. Configure Environment Variables
To secure sensitive information, store your database credentials in a .env file.

Create a .env file in the src folder with the following content:

env
Copy code
URL=jdbc:mysql://localhost:3306/book_inventory_management_system
PASSWORD=your_mysql_password
Replace your_mysql_password with your actual MySQL password.

Configure BookServer to Load Environment Variables: The BookServer class is configured to read from .env using Dotenv Java, so no additional configuration is needed here.

5. Start the Backend Server
Make sure your MySQL server is running.
Start the backend server by running the BookServer class. This will start an HTTP server listening on port 8080.
Verify Server Port: Make sure the server port (8080) matches the CORS settings for your frontend. Update the Access-Control-Allow-Origin header in BookServer if needed to allow requests from your frontend’s port.
6. Frontend Configuration
Make sure the frontend is running on the port specified in your backend's Access-Control-Allow-Origin header (http://localhost:5173 by default).
If your frontend is on a different port, update the backend CORS configuration to allow it:
java
Copy code
exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:your_frontend_port");

Usage
Adding Books: Navigate to the Add Book section on the frontend to add new books.
Filtering Books: Use the filter form to search books by title, author, genre, or publication date.
Exporting Data: Use the export button to download book data in CSV or JSON format.

Troubleshooting
CORS Issues: Ensure the backend’s Access-Control-Allow-Origin header matches the frontend URL and port.
Database Connection Errors: Double-check your MySQL credentials in the .env file and ensure MySQL is running.
Library Errors: Confirm that all required JAR files are in the lib folder and added to the build path.
