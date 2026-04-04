import requests
import base64
from config import ROBOFLOW_API_KEY, ROBOFLOW_MODEL_ID

def analyze_image(image_bytes: bytes):
    # Roboflow ki API call karni hai defects check karne ke liye
    if not ROBOFLOW_API_KEY or not ROBOFLOW_MODEL_ID:
        return {"error": "Missing keys", "predictions": []}

    url = f"https://detect.roboflow.com/{ROBOFLOW_MODEL_ID}?api_key={ROBOFLOW_API_KEY}"

    try:
        # Base64 encode karke bhejna padta hai image
        encoded = base64.b64encode(image_bytes).decode('ascii')
        
        response = requests.post(url, data=encoded, headers={
            "Content-Type": "application/x-www-form-urlencoded"
        }, timeout=10)
        
        return response.json()
    except Exception as e:
        return {"error": str(e), "predictions": []}

def calculate_image_score(results):
    # confidence levels ka average nikalenge calculation ke liye
    predictions = results.get("predictions", [])
    
    if not predictions:
        print("ML results mein kuch nahi mila")
        return 0.0
        
    scores = [p.get("confidence", 0.0) * 100 for p in predictions]
    avg = sum(scores) / len(scores)
    
    # constant multiply karke 100 tak limit karenge
    final = max(0.0, min(100.0, avg * 1.2))
    return final
