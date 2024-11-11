import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.sql.*;
import com.google.gson.Gson;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.ArrayList;
import java.util.List;

public abstract class BookServer {
    private static final Dotenv dotenv = Dotenv.load();
    private static final String DB_URL = dotenv.get("URL");
    private static final String USER  = "root";
    private static final String PASS = dotenv.get("PASSWORD");

    public static void main(String[] args) throws IOException {
        startHttpServer();
        try {
            Thread.currentThread().join();
        } catch (InterruptedException e) {
            System.out.println("Server stopped.");
        }
    }

    private static void startHttpServer() throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/books", new BookHandler());
        server.setExecutor(null);
        server.start();
        System.out.println("Server is listening on port 8080");
    }

    private static class BookHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:5173");
                exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:5173");

                // Fetch books from database
                List<Book> books = fetchBooksFromDatabase();
                Gson gson = new Gson();
                String jsonResponse = gson.toJson(books);

                exchange.sendResponseHeaders(200, jsonResponse.length());
                OutputStream outputStream = exchange.getResponseBody();
                outputStream.write(jsonResponse.getBytes(StandardCharsets.UTF_8));
                outputStream.close();
                return;
            }

            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:5178");

                InputStream inputStream = exchange.getRequestBody();
                String json = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

                Gson gson = new Gson();
                Book book = gson.fromJson(json, Book.class);
                saveBookToDatabase(book);

                String response = "Book data received and stored";
                exchange.sendResponseHeaders(200, response.length());
                OutputStream outputStream = exchange.getResponseBody();
                outputStream.write(response.getBytes(StandardCharsets.UTF_8));
                outputStream.close();
                return;
            }

            exchange.sendResponseHeaders(405, -1);
        }
    }

    // Fetch books directly from the MySQL database
    private static List<Book> fetchBooksFromDatabase() {
        List<Book> books = new ArrayList<>();
        String query = "SELECT entry_id, title, author, genre, publication_date, isbn FROM Inventory";

        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
             PreparedStatement stmt = conn.prepareStatement(query);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Book book = new Book(
                        rs.getString("entry_id"),
                        rs.getString("title"),
                        rs.getString("author"),
                        rs.getString("genre"),
                        rs.getString("publication_date"),
                        rs.getString("isbn")
                );
                books.add(book);
            }

        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
            e.printStackTrace();
        }

        return books;
    }

    // Save book to the MySQL database
    public static void saveBookToDatabase(Book book) {
        String query = "INSERT INTO Inventory (entry_id, title, author, genre, publication_date, isbn) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
             PreparedStatement stmt = conn.prepareStatement(query)) {

            stmt.setString(1, book.getEntryId());
            stmt.setString(2, book.getTitle());
            stmt.setString(3, book.getAuthor());
            stmt.setString(4, book.getGenre());
            stmt.setString(5, book.getPublicationDate());
            stmt.setString(6, book.getIsbn());

            System.out.println(book.getIsbn());

            stmt.executeUpdate();
            System.out.println("Book stored in the database.");
        } catch (SQLException e) {
            System.err.println("Database error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}


