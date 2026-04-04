# Project Satya

## Prerequisites

Make sure you have the following installed before getting started:

- [Python 3.11.0](https://www.python.org/downloads/release/python-3110/)
- [Node.js](https://nodejs.org/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Monarchy712/projectSatya.git
```

---

## Backend Setup

```bash
cd backend
```

### Create a Virtual Environment

```bash
python -m venv venv
```

### Activate the Virtual Environment

- **Windows:**
  ```bash
  venv\Scripts\activate
  ```
- **macOS/Linux:**
  ```bash
  source venv/bin/activate
  ```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run the Backend Server

```bash
uvicorn main:app --reload
```

The backend will be running at `http://127.0.0.1:8000`

---

## Frontend Setup

```bash
cd frontend
```

### Install Dependencies

```bash
npm i
```

### Run the Frontend Dev Server

```bash
npm run dev
```

The frontend will be running at `http://localhost:5173` (or as indicated in your terminal)

---
