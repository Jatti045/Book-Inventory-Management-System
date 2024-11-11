import React, { useState, useEffect } from "react";
import { Download, FileJson, FileSpreadsheet, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ExportButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/books"); // Adjust the URL to match your API endpoint
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setExportStatus("error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = async (format) => {
    if (!data || data.length === 0) {
      setExportStatus("error");
      return;
    }

    setExportStatus("exporting");
    try {
      let content;
      const filename = `library-inventory-${new Date().toISOString().split("T")[0]}`;

      if (format === "csv") {
        const headers = Object.keys(data[0]).join(",");
        const rows = data.map((item) => Object.values(item).join(","));
        content = [headers, ...rows].join("\n");
        downloadFile(`${filename}.csv`, content, "text/csv");
      } else {
        content = JSON.stringify(data, null, 2);
        downloadFile(`${filename}.json`, content, "application/json");
      }

      setExportStatus("success");
      setTimeout(() => {
        setExportStatus(null);
        setShowOptions(false);
      }, 2000);
    } catch (error) {
      console.error("Export failed:", error);
      setExportStatus("error");
      setTimeout(() => setExportStatus(null), 2000);
    }
  };

  const downloadFile = (filename, content, type) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
      <div className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col items-center justify-center">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-amber-800">Library Export Options</h1>
          <p className="text-amber-700 mt-2">Download your library data in CSV or JSON format.</p>
        </div>

        {/* Export Button */}
        {!showOptions ? (
            <Button
                onClick={() => setShowOptions(true)}
                className="bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform duration-150 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
                disabled={loading || !data}
            >
              <Download className="w-5 h-5" />
              <span>{loading ? "Loading..." : "Export Library"}</span>
            </Button>
        ) : (
            <Card className="absolute z-10 w-64 p-5 shadow-2xl rounded-lg bg-white transition-transform duration-200 transform scale-105">
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-amber-900 font-semibold">Choose Format</p>
                  <X
                      className="w-5 h-5 text-amber-700 cursor-pointer hover:text-amber-900 transition-colors"
                      onClick={() => setShowOptions(false)}
                  />
                </div>
                <div className="space-y-3">
                  <Button
                      variant="ghost"
                      className="w-full justify-start text-amber-900 font-medium hover:bg-amber-50 transition-colors rounded-lg px-3 py-2 flex items-center shadow-sm"
                      onClick={() => handleExport("csv")}
                      disabled={exportStatus === "exporting"}
                  >
                    <FileSpreadsheet className="w-5 h-5 mr-2 text-amber-600" />
                    Export as CSV
                  </Button>
                  <Button
                      variant="ghost"
                      className="w-full justify-start text-amber-900 font-medium hover:bg-amber-50 transition-colors rounded-lg px-3 py-2 flex items-center shadow-sm"
                      onClick={() => handleExport("json")}
                      disabled={exportStatus === "exporting"}
                  >
                    <FileJson className="w-5 h-5 mr-2 text-amber-600" />
                    Export as JSON
                  </Button>
                </div>
              </CardContent>
            </Card>
        )}

        {/* Success and Error Notifications */}
        {exportStatus === "success" && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-5 py-3 rounded-lg shadow-md flex items-center space-x-2 transition-opacity duration-300 animate-fadeInOut">
              <Check className="w-5 h-5" />
              <span>Export successful</span>
            </div>
        )}

        {exportStatus === "error" && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-5 py-3 rounded-lg shadow-md flex items-center space-x-2 transition-opacity duration-300 animate-fadeInOut">
              <X className="w-5 h-5" />
              <span>Export failed</span>
            </div>
        )}

        {/* Overlay for the Options Card */}
        {showOptions && (
            <div
                className="fixed inset-0 z-0 bg-black bg-opacity-20 backdrop-blur-sm"
                onClick={() => setShowOptions(false)}
            />
        )}
      </div>
  );
};

export default ExportButton;





