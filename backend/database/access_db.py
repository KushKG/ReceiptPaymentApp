from google.cloud import firestore
from database.setup_db import db

def get_user(user_id):
    users_ref = db.collection('users')
    user_doc_ref = users_ref.document(user_id)
    user_doc = user_doc_ref.get()

    if user_doc.exists:
        user_data = user_doc.to_dict()
        user_data['id'] = user_doc.id
        return user_data
    else:
        print(f"No user found with ID: {user_id}")
        return None

def get_receipt(receipt_id):
    receipts_ref = db.collection('receipts')
    receipt_doc_ref = receipts_ref.document(receipt_id)
    receipt_doc = receipt_doc_ref.get()

    if receipt_doc.exists:
        receipt_data = receipt_doc.to_dict()
        receipt_data['id'] = receipt_doc.id
        return receipt_data
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

def search_users(search):
    users_ref = db.collection('users')
    query = users_ref.where('email', '>=', search).where('email', '<', search + '\uf8ff')
    query_result = query.stream()

    results = []
    for doc in  query_result:
        data = doc.to_dict()
        data['id'] = doc.id
        results.append(data) 
    return results

# def calculate_user_total(user_id, receipt_id):
#     receipts_ref = db.collection('receipts')
#     receipt_doc_ref = receipts_ref.document(receipt_id)
#     receipt_doc = receipt_doc_ref.get()
#     if receipt_doc.exists:
#         receipt_data = receipt_doc.to_dict()
#         int total = 0;
#         for item in receipt_data.items:
#             for users in receipt_data.items

