public class Book {
    private String entryId;
    private String title;
    private String author;
    private String genre;
    private String publicationDate;
    private String isbn;

    public Book(String entryId, String title, String author, String genre, String publicationDate, String isbn) {
        this.entryId = entryId;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.publicationDate = publicationDate;
        this.isbn = isbn;
    }

    public String getEntryId() {
        return entryId;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getGenre() {
        return genre;
    }

    public String getPublicationDate() {
        return publicationDate;
    }

    public String getIsbn() {
        return isbn;
    }
}