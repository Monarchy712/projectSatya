# 🔍 Satya

> **AI-Powered Fault Detection & Context Comparison System**

Satya is an intelligent visual inspection platform that combines real-time computer vision, deep learning, and generative AI to detect faults, anomalies, and contextual inconsistencies in visual data — built for speed, accuracy, and scalability.

---

## 🚀 Features

- **Real-Time Fault Detection** — Detects defects and anomalies in images/video using YOLO (Ultralytics) and Roboflow inference pipelines
- **Context Comparator** — Compares scenes, frames, or images for contextual differences using ML models and Google Generative AI
- **Computer Vision Pipeline** — Powered by OpenCV, MediaPipe, and Supervision for robust visual processing
- **RESTful Backend** — FastAPI-based backend with async support, SQLAlchemy ORM, and Alembic migrations
- **Interactive Notebooks** — Full JupyterLab environment for experimentation and visualization
- **Multi-Model Support** — Integrates PyTorch, scikit-learn, and Google GenAI (Gemini) for flexible inference

---

## 🧠 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | FastAPI, Uvicorn, Pydantic, SQLAlchemy, Alembic |
| **Computer Vision** | OpenCV, Ultralytics (YOLOv8+), MediaPipe, Supervision, Roboflow |
| **ML / AI** | PyTorch, TorchVision, scikit-learn, SciPy, NumPy |
| **Generative AI** | Google GenAI (Gemini), google-generativeai |
| **Data** | Pandas, Polars, Matplotlib, Folium |
| **Notebooks** | JupyterLab, ipywidgets |
| **Utilities** | aiohttp, httpx, python-dotenv, tqdm |

---

## 📁 Project Structure

```
satya/
├── backend/              # FastAPI application
│   ├── main.py           # Entry point
│   ├── models/           # SQLAlchemy models
│   ├── routers/          # API route handlers
│   └── schemas/          # Pydantic schemas
├── fault_detection/      # CV fault detection module
│   ├── detector.py       # YOLO-based detection pipeline
│   ├── inference.py      # Roboflow inference integration
│   └── utils.py          # Preprocessing utilities
├── context_comparator/   # Scene/context comparison module
│   ├── comparator.py     # Core comparison logic
│   ├── gemini_client.py  # Google GenAI integration
│   └── embeddings.py     # Feature extraction
├── notebooks/            # Jupyter notebooks for experiments
├── alembic/              # DB migrations
├── requirements.txt
└── README.md
```

> **Note:** Adapt the structure above to match your actual directory layout.

---

## ⚙️ Installation

### Prerequisites

- Python 3.10+
- pip
- (Optional) CUDA-compatible GPU for faster inference

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/satya.git
cd satya

# 2. Create a virtual environment
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your API keys and database URL
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=sqlite:///./satya.db
ROBOFLOW_API_KEY=your_roboflow_api_key
GOOGLE_API_KEY=your_google_genai_api_key
```

---

## 🏃 Running the Project

### Start the Backend Server

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

API docs available at: `http://localhost:8000/docs`

### Run Database Migrations

```bash
alembic upgrade head
```

### Launch Jupyter Notebooks

```bash
jupyter lab
```

---

## 🔬 Modules

### 1. Fault Detection

Uses YOLOv8 (Ultralytics) and Roboflow inference to detect defects in images or video streams.

```python
from fault_detection.detector import FaultDetector

detector = FaultDetector(model_path="models/yolov8n.pt")
results = detector.run(image_path="sample.jpg")
```

### 2. Context Comparator

Compares two images or scenes for contextual differences using embeddings and Gemini.

```python
from context_comparator.comparator import ContextComparator

comparator = ContextComparator()
diff = comparator.compare("before.jpg", "after.jpg")
print(diff.summary)
```

---

## 📊 Results & Visualizations

Visualizations are generated using Matplotlib, Supervision bounding-box overlays, and Folium for geospatial data (where applicable).

---

## 🛠️ Built At

This project was built as part of a **Hackathon**. The goal was to create a production-grade AI inspection system that can detect faults and contextual anomalies in real-world visual data.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ during a hackathon.

<!-- Add your team members here -->
- **Your Name** — [@your-github](https://github.com/your-github)

---

<p align="center">Made with Python, OpenCV, and too much caffeine ☕</p>
