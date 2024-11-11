import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Setting = () => {
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
      <div className=" min-h-screen bg-gradient-to-b from-amber-50 to-white p-8 flex flex-col">
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-gradient-to-b from-amber-50 to-white p-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-amber-900">Feature Not Implemented</AlertDialogTitle>
          <AlertDialogDescription className="text-amber-700">
            We apologize for the inconvenience, but the Settings feature is
            currently under development and not available at the moment. You
            will be redirected to the homepage.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="text-white bg-amber-700 hover:bg-amber-800" onClick={() => navigate("/")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </div>
  );
};

export default Setting;
