import axios from "axios";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast.js";
import {
  BookOpen,
  Library,
  Calendar,
  Hash,
  User,
  BookmarkIcon,
} from "lucide-react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddBook = () => {
  const { toast } = useToast();

  const [entryId, setEntryId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [isbn, setIsbn] = useState("");
  const [addedBooks, setAddedBooks] = useState([]);

  const resetTableInput = () => {
    setEntryId("");
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublicationDate("");
    setIsbn("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookData = {
      entryId,
      title,
      author,
      genre,
      publicationDate,
      isbn,
    };

    try {
      validateBookData(bookData);

      await axios.post("http://localhost:8080/api/books", bookData);
      toast({
        title: "Book Added Successfully!",
        description: "The book has been added to your library.",
        duration: 3000,
        isClosable: true,
      });

      setAddedBooks([...addedBooks, bookData]);
      resetTableInput();
    } catch (e) {
      console.log("Validation error:", e);
      toast({
        title: "Failed to Add Book",
        description: "There was an error with the book data.",
        duration: 3000,
        isClosable: true,
        variant: "destructive",
      });
      resetTableInput();
    }
  };

  const validateBookData = (bookData) => {
    const { entryId, title, author, genre, publicationDate, isbn } = bookData;

    if (!entryId || isNaN(entryId)) {
      throw new Error("Entry ID is required and must be a number.");
    } else if (addedBooks.some((book) => book.entryId === entryId)) {
      throw new Error("This Entry ID already exists. Please use a unique ID.");
    }

    if (!title || title.trim() === "") {
      throw new Error("Title is required.");
    }

    if (!author || author.trim() === "") {
      throw new Error("Author is required.");
    }

    if (!genre || genre.trim() === "") {
      throw new Error("Genre is required.");
    }

    if (!publicationDate || isNaN(Date.parse(publicationDate))) {
      throw new Error("Publication date is required and must be a valid date.");
    } else if (new Date(Date.parse(publicationDate)) > new Date()) {
      throw new Error("Publication date cannot be in the future.");
    }

    const isbnPattern = /^(?:\d{10}|\d{13})$/;
    if (!isbn || !isbnPattern.test(isbn)) {
      throw new Error("ISBN is required and must be 10 or 13 digits.");
    }
  };

  return (
      <div className="min-h-screen min-w-screen bg-gradient-to-b from-amber-50 to-white p-8 mt-10 overflow-x-hidden container flex justify-center items-center ">
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-t-4 border-t-amber-600">
          <CardHeader className="space-y-2 bg-amber-50">
            <div className="flex items-center justify-center mb-4">
              <Library className="w-12 h-12 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-serif text-center text-amber-900">
              Add New Book to Library
            </CardTitle>
            <p className="text-center text-amber-700 text-sm">
              Enter the book details below to add it to your inventory
            </p>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-amber-900 mb-1">
                    <Hash className="w-4 h-4 mr-2 text-amber-600" />
                    Entry ID
                  </label>
                  <Input
                      type="text"
                      value={entryId}
                      onChange={(e) => setEntryId(e.target.value)}
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Enter ID"
                      required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-amber-900 mb-1">
                    <BookOpen className="w-4 h-4 mr-2 text-amber-600" />
                    Title
                  </label>
                  <Input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Enter book title"
                      required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-amber-900 mb-1">
                    <User className="w-4 h-4 mr-2 text-amber-600" />
                    Author
                  </label>
                  <Input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Enter author name"
                      required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-amber-900 mb-1">
                    <BookmarkIcon className="w-4 h-4 mr-2 text-amber-600" />
                    Genre
                  </label>
                  <Input
                      type="text"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Enter genre"
                      required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-amber-900 mb-1">
                    <Calendar className="w-4 h-4 mr-2 text-amber-600" />
                    Publication Date
                  </label>
                  <Input
                      type="date"
                      value={publicationDate}
                      onChange={(e) => setPublicationDate(e.target.value)}
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-amber-900 mb-1">
                    <Hash className="w-4 h-4 mr-2 text-amber-600" />
                    ISBN
                  </label>
                  <Input
                      type="text"
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Enter ISBN"
                      required
                  />
                </div>
              </div>
              <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Add to Library
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
  );
};

export default AddBook;




