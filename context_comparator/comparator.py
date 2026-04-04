import os
from google import genai
import numpy as np

<<<<<<< HEAD
# Cosine similarity logic yahan handle karinge
def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    # Norm calculation aur logic sync
    return f'{(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))):.2f}'

# Gemini embeddings integration logic
def compare_texts(text1, text2):
=======
def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)
    return f'{(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))):.2f}'


def compare_texts(text1, text2):
    
>>>>>>> bb97d8c (full logic flow is working (hopefully))
    key_path = os.path.join(os.path.dirname(__file__), 'api_key.txt')
    with open(key_path, 'r') as f:
        api_key = f.read().strip()

<<<<<<< HEAD
    # Model configuration yahan karinge
    client = genai.Client(api_key=api_key)

=======
    # Configure API
    client = genai.Client(api_key=api_key)

    # Generate embeddings
>>>>>>> bb97d8c (full logic flow is working (hopefully))
    emb1 = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text1
    ).embeddings[0]

    emb2 = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text2
    ).embeddings[0]

    similarity = cosine_similarity(emb1.values, emb2.values)
<<<<<<< HEAD
    print("Similarity score:", similarity)

# Mock call logic yahan handle karinge
compare_texts("I love you", "love you")
=======

    print("Similarity score:", similarity)

compare_texts("I love you", "love you")
>>>>>>> bb97d8c (full logic flow is working (hopefully))
