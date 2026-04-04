def detect_faults(image_path):
  import cv2
  import requests
  import supervision as sv
  from inference_sdk import InferenceHTTPClient
  from PIL import Image

  img = Image.open(image_path)

<<<<<<< HEAD
    # roboflow client setup
    # API key load karke model call karinge
    with open('api_key.txt', 'r') as f:
        api_key = f.read()

    # detect construction defects logic
    print(f"Analyzing image at {image_path} for construction defects...")
    
    # simulation for results
    results = {"predictions": [{"class": "crack", "confidence": 0.88}]}
    
    return results
=======
  img.show()
>>>>>>> bb97d8c (full logic flow is working (hopefully))

  with open('api_key.txt', 'r') as f:
    api_key = f.read()

  client = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key=api_key,
  )
  results = client.infer(img, model_id="construction-defects/3")

  detections = sv.Detections.from_inference(results)

  labels = [f'{i['class']} {i['confidence']:.3f}' for i in results['predictions']]

  if detections.is_empty():
    print("No detections found")
    sv.plot_image(img)
  else:
    annotated_image = sv.BoxAnnotator().annotate(scene=img, detections=detections)
    label_annotator = sv.LabelAnnotator()
    annotated_frame = label_annotator.annotate(
      scene=img.copy(),
      detections=detections,
      labels=labels
  )
  sv.plot_image(annotated_frame)