# 🧪 TDD Frontend Workshop

This repository contains a **frontend-focused Test-Driven Development (TDD) exercise**, demonstrating how to iteratively implement features guided by automated tests.

The goal is to show a clean and structured TDD workflow for building small, focused functionalities while keeping code maintainable and testable.

---

## 🚀 What’s inside

- **`fizzbuzz` function**:  
  Classic programming exercise implemented using TDD:
  - Returns `"fizz"` if the number is a multiple of 3  
  - Returns `"buzz"` if the number is a multiple of 5  
  - Returns `"fizzbuzz"` if the number is a multiple of both 3 and 5  
  - Returns the number itself if none of the above conditions are met  
  - Includes type checking and error handling for invalid inputs  

- **`innerJoin` function**:  
  Implementation of an array join utility (`inner join`) with full coverage for:
  - Valid and invalid inputs  
  - Matching and non-matching keys  
  - Edge cases (missing keys, empty arrays)  

- **React Calculator component**:  
  - Built incrementally using TDD.  
  - Handles numeric and operator input, deletion, clearing, and error states. 

---

## 🧩 Tech stack

- **React** (UI rendering)
- **Vitest** + **@testing-library/react** (testing)
- **mathjs** (expression evaluation)
- **CSS Grid / Flexbox** (layout)
- **TDD methodology** (Red → Green → Refactor)

---

## 🛠 Running locally

```bash
# Install dependencies
npm install

# Run tests (watch mode)
npm run test

# Check coverage
npm run coverage

# Run development server
npm run dev
