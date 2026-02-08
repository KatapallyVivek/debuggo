import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Map common errors to explanations
const errorExplanations = [
  {
    match: /undefined/i,
    explanation: "This error occurs when a variable is undefined. Check your variable declarations or imports."
  },
  {
    match: /map/i,
    explanation: "map() is used on something that is not an array. Make sure the variable is an array."
  },
  {
    match: /ReferenceError/i,
    explanation: "ReferenceError occurs when a variable is used before it is declared."
  },
  {
    match: /SyntaxError/i,
    explanation: "SyntaxError happens due to invalid JavaScript syntax. Check your code carefully."
  },
  {
    match: /TypeError/i,
    explanation: "TypeError occurs when a value is not of the expected type for an operation."
  },
  {
    match: /Cannot read property/i,
    explanation: "This error occurs when you try to access a property of undefined or null."
  },
  {
    match: /ReactDOM/i,
    explanation: "ReactDOM errors usually happen if you call ReactDOM.render incorrectly or target a missing element."
  },
  {
    match: /useState/i,
    explanation: "Errors with useState happen if you call it outside a functional component or incorrectly destructure."
  },
  {
    match: /useEffect/i,
    explanation: "Errors with useEffect often occur when dependencies are missing or useEffect is misused."
  },
  {
    match: /props/i,
    explanation: "Accessing props incorrectly can cause undefined errors. Check your component props."
  },
  {
    match: /Unexpected token/i,
    explanation: "Unexpected token usually means a syntax error in your code, such as missing brackets or commas."
  },
  {
    match: /export/i,
    explanation: "Errors with export happen if you mix CommonJS (require/module.exports) and ES modules (import/export)."
  },
  {
    match: /Module not found/i,
    explanation: "Module not found occurs when you try to import a module that doesn’t exist or has a wrong path."
  },
  {
    match: /axios/i,
    explanation: "Axios errors occur when HTTP requests fail. Check your endpoint, network, or request data."
  },
  {
    match: /Cannot set property/i,
    explanation: "This happens when you try to assign a value to a read-only or undefined property."
  },
];

// API endpoint
app.post("/api/explain", (req, res) => {
  const { error } = req.body;
  let explanation = "Sorry, could not generate an explanation for this error.";

  for (let err of errorExplanations) {
    if (err.match.test(error)) {
      explanation = err.explanation;
      break;
    }
  }

  // simulate slight delay for realism
  setTimeout(() => res.json({ explanation }), 500);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
