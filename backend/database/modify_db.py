from backend.database.setup_db import db
from schema import validate_receipt_data, validate_user_data
from google.cloud import firestore

def create_receipt(data):
    # validate data
    validate_receipt_data(data)

    # get collection refs
    users_ref = db.collection('users')
    receipts_ref = db.collection('receipts')

    # add data and update user collection with receipt it
    update_time, new_receipt = receipts_ref.add(data)
    curr_user_ref = users_ref.document(data['owner_id'])
    curr_user_ref.update({'receipt_ids': firestore.ArrayUnion([new_receipt.id])})

def create_user(data):
    # validate data
    validate_user_data(data)

    # get collection ref
    users_ref = db.collection('users') 

    # add data to users collection
    update_time, new_receipt = users_ref.add(data)


def add_receipt_to_user(user_id, receipt_id):
    try: 
        user_ref = db.collection('users').document(user_id)
        receipt_ref = db.collection('receipts').document(receipt_id)
    except:
        print("Error adding receipt make sure id's are correct")
    
    user_ref.update({'receipt_ids': firestore.ArrayUnion([receipt_id])})
    receipt_ref.update({'collaborator_ids': firestore.ArrayUnion([user_id])})


def delete_user_from_receipt(user_id, receipt_id):
    try: 
        user_ref = db.collection('users').document(user_id)
        receipt_ref = db.collection('receipts').document(receipt_id)
    except:
        print("Error adding receipt make sure id's are correct")
    
    user_ref.update({'receipt_ids': firestore.ArrayRemove([receipt_id])})
    receipt_ref.update({'collaborator_ids': firestore.ArrayRemove([user_id])})

    