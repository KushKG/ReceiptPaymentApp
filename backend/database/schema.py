from datetime import datetime
from google.cloud import firestore

receipt_schema = {
    "name": str,
    "items": list,
    "timestamp": datetime,
    "owner_id": str,
    "collaborator_ids": list,
    "image_url": str,
    "done_ids": list
}

def validate_receipt_data(data):
    for field, field_type in receipt_schema.items():
        if field not in data:
            raise ValueError(f"Missing required field: {field}")
        if not isinstance(data[field], field_type):
            raise ValueError(f"Invalid type for field {field}. Expected {field_type}, got {type(data[field])}")
        

user_schema = {
    "name": str,
    "email": str,
    "receipt_ids": list
}

def validate_user_data(data):
    for field, field_type in user_schema.items():
        if field not in data:
            raise ValueError(f"Missing required field: {field}")
        if not isinstance(data[field], field_type):
            raise ValueError(f"Invalid type for field {field}. Expected {field_type}, got {type(data[field])}")
