import os
from google import genai
import numpy as np

# Cosine similarity logic yahan handle karinge
def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    # Norm calculation aur logic sync
    return f'{(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))):.2f}'

# Gemini embeddings integration logic
def compare_texts(text1, text2):
    key_path = os.path.join(os.path.dirname(__file__), 'api_key.txt')
    with open(key_path, 'r') as f:
        api_key = f.read().strip()

    # Model configuration yahan karinge
    client = genai.Client(api_key=api_key)

    emb1 = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text1
    ).embeddings[0]

    emb2 = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text2
    ).embeddings[0]

    similarity = cosine_similarity(emb1.values, emb2.values)
    print("Similarity score:", similarity)

# Mock call logic yahan handle karinge
compare_texts("I love you", "love you")
