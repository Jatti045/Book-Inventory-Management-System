import React from "react";
import { Library, PlusCircle, ClipboardList, Download } from "lucide-react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-b from-amber-50 to-white p-8 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between mb-12">
        <div className="hidden md:flex flex items-center">
          <Library className="w-10 h-10 text-amber-600 mr-3" />
          <h1 className="text-3xl font-serif text-amber-900">
            Book Inventory Management
          </h1>
        </div>
        <nav className="hidden sm:flex space-x-4">
          <Button
            variant="ghost"
            className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            variant="ghost"
            className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
            onClick={() => navigate("/add-book")}
          >
            Add Book
          </Button>
          <Button
            variant="ghost"
            className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
            onClick={() => navigate("/book-list")}
          >
            Inventory
          </Button>
          <Button
            variant="ghost"
            className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
            onClick={() => navigate("/export")}
          >
            Export
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-16">
        <Library className="w-16 h-16 text-amber-600 mb-4" />
        <h2 className="text-4xl font-semibold text-amber-900 mb-4">
          Welcome to Your Library
        </h2>
        <p className="text-lg text-amber-700 mb-6">
          Manage your book inventory efficiently and effortlessly.
        </p>
        <div className="flex space-x-4">
          <Button
            onClick={() => navigate("/add-book")}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Get Started
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50"
              >
                Learn More
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gradient-to-b from-amber-50 to-white p-8">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl text-amber-900">
                  Welcome to our Book Inventory Management System!
                </AlertDialogTitle>
                <AlertDialogDescription className="text-amber-700">
                  Our platform empowers you to effortlessly manage your entire
                  book collection. Add new books with ease, categorize them by
                  genres, track inventory levels, and generate insightful
                  reports to drive your library's success. Whether you're
                  running a small bookstore or a large library, our intuitive
                  interface and robust features are designed to streamline your
                  operations and enhance your organizational efficiency.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction className="text-white bg-amber-700 hover:bg-amber-800">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      {/* Features Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Feature 1 */}
        <Card className="shadow-lg border-t-4 border-t-amber-600">
          <CardHeader className="flex items-center space-x-2 bg-amber-50 p-4">
            <PlusCircle className="w-6 h-6 text-amber-600" />
            <CardTitle className="text-xl text-amber-900">
              Add New Books
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-amber-700">
              Easily add new books to your inventory with detailed information.
            </p>
          </CardContent>
        </Card>

        {/* Feature 2 */}
        <Card className="shadow-lg border-t-4 border-t-amber-600">
          <CardHeader className="flex items-center space-x-2 bg-amber-50 p-4">
            <ClipboardList className="w-6 h-6 text-amber-600" />
            <CardTitle className="text-xl text-amber-900">
              Manage Inventory
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-amber-700">
              Keep track of your book inventory with ease and maintain optimal
              stock levels.
            </p>
          </CardContent>
        </Card>

        {/* Feature 3 */}
        <Card className="shadow-lg border-t-4 border-t-amber-600">
          <CardHeader className="flex items-center space-x-2 bg-amber-50 p-4">
            <Download className="w-6 h-6 text-amber-600" />
            <CardTitle className="text-xl text-amber-900">Export</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-amber-700">
              Seamlessly export your inventory data in various
              formats, enabling easy sharing and comprehensive external
              analysis.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-auto">
        <div className="text-center text-amber-700">
          &copy; {new Date().getFullYear()} Book Inventory Management. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
