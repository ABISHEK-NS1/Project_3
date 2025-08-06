from pymongo import MongoClient

def get_public_experiences():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["Interview_Experince_Portal"]
    collection = db["experiences"]
    return list(collection.find({"isPublic": True}))
