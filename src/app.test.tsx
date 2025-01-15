// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import App from "./App";

// describe("App Component", () => {
//   test("should only render the button initially", () => {
//     render(<App />);
    
//     // Check that the button is in the document
//     const button = screen.getByRole("button", { name: /click me/i });
//     expect(button).toBeInTheDocument();

//     // Check that no message is initially displayed
//     const message = screen.queryByText(/button was clicked!/i);
//     expect(message).not.toBeInTheDocument();
//   });

//   test("should show a message when the button is clicked", () => {
//     render(<App />);

//     // Find the button and simulate a click
//     const button = screen.getByRole("button", { name: /click me/i });
//     fireEvent.click(button);

//     // Check that the message is displayed after the click
//     const message = screen.getByText(/button was clicked!/i);
//     expect(message).toBeInTheDocument();
//   });
// });
