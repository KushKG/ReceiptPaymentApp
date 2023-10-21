from google.cloud import firestore
from setup import db

def get_user(user_id):
    users_ref = db.collection('users')
    user_doc_ref = users_ref.document(user_id)
    user_doc = user_doc_ref.get()

    if user_doc.exists:
        user_data = user_doc.to_dict()
        return user_data
    else:
        print(f"No user found with ID: {user_id}")
        return None

def get_receipt(receipt_id):
    receipts_ref = db.collection('receipts')
    receipt_doc_ref = receipts_ref.document(receipt_id)
    receipt_doc = receipt_doc_ref.get()

    if receipt_doc.exists:
        user_data = receipt_doc.to_dict()
        return user_data
    else:
        print(f"No receipt found with ID: {receipt_id}")
        return None

def get_user_receipts(user_id):
    users_ref = db.collection('users')
    user_doc_ref = users_ref.document(user_id)
    user_doc = user_doc_ref.get()
    if user_doc.exists:
        user_data = user_doc.to_dict()
        user_receipts = user_data['receipt_ids']
        data = []
        for receipt in user_receipts:
            data.append(get_receipt(receipt));
        return data
    else:
        print(f"No user found with ID: {user_id}")
        return None