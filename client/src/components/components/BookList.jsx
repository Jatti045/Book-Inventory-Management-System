import {
  BookOpen,
  User,
  Calendar,
  BookmarkIcon,
  Hash,
  Search,
  Loader2,
} from "lucide-react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";

const BookList = ({ books: initialBooks = [] }) => {
  const [books, setBooks] = useState(initialBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8080/api/books");
        setBooks(response.data);
      } catch (e) {
        console.log("Failed to fetch books.", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
      Object.values(book).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
      <Card className="w-full border-t-4 border-t-amber-600 bg-amber-50/50 shadow-lg">
        <CardHeader className="pb-3">
          <div className="grid grid-cols-1 my-2">
            <CardTitle className="text-2xl font-serif text-amber-900 flex items-center justify-center">
              <BookOpen className="md:w-6 md:h-6 w-12 h-12 md:ml-0 ml-8  mr-2 text-amber-600" />
              Library Inventory
            </CardTitle>
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-amber-600" />
              <Input
                  placeholder="Search books..."
                  className="pl-8 bg-white border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-amber-200">
            <table className="w-full">
              <thead className="bg-amber-100">
              <tr>
                {[
                  { key: "entryId", label: "Entry ID", icon: Hash },
                  { key: "title", label: "Title", icon: BookOpen },
                  { key: "author", label: "Author", icon: User },
                  { key: "genre", label: "Genre", icon: BookmarkIcon },
                  { key: "publicationDate", label: "Published", icon: Calendar },
                  { key: "isbn", label: "ISBN", icon: Hash },
                ].map(({ key, label, icon: Icon }) => (
                    <th
                        key={key}
                        onClick={() => handleSort(key)}
                        className="px-4 py-3 text-left text-sm font-medium text-amber-900 cursor-pointer hover:bg-amber-200/50 transition-colors"
                    >
                      <div className="flex items-center space-x-1">
                        <Icon className="w-4 h-4 text-amber-600" />
                        <span>{label}{getSortIndicator(key)}</span>
                      </div>
                    </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {isLoading ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center">
                      <Loader2 className="w-8 h-8 mx-auto animate-spin text-amber-600" />
                      <p className="mt-2 text-amber-900">Loading books...</p>
                    </td>
                  </tr>
              ) : sortedBooks.length > 0 ? (
                  sortedBooks.map((book, index) => (
                      <tr
                          key={book.entryId}
                          className={`
                      hover:bg-amber-50 transition-colors
                      ${index % 2 === 0 ? 'bg-white' : 'bg-amber-50/30'}
                    `}
                      >
                        <td className="px-4 py-3 text-sm text-amber-900">{book.entryId}</td>
                        <td className="px-4 py-3 text-sm text-amber-900 font-medium">{book.title}</td>
                        <td className="px-4 py-3 text-sm text-amber-900">{book.author}</td>
                        <td className="px-4 py-3 text-sm text-amber-900">
                      <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                        {book.genre}
                      </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-amber-900">
                          {new Date(book.publicationDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-amber-900 font-mono">{book.isbn}</td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-12 text-center">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 text-amber-300" />
                      <p className="text-lg font-medium text-amber-900">No books found</p>
                      <p className="text-sm text-amber-600 mt-1">
                        {searchTerm ? 'Try different search terms' : 'Try adjusting your search filters'}
                      </p>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
  );
};

export default BookList;

