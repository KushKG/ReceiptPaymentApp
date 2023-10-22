from modify_db import create_receipt, create_user, add_receipt_to_user, delete_user_from_receipt, add_user_to_item
from datetime import datetime
from access_db import get_user, get_user_receipts

data = {
    'items': [
        {
            'name': 'apple',
            'price': 1.50,
            'user_ids': [1, 2]
        },
        {
            'name': 'bread',
            'price': 2.00,
            'user_ids': [3, 4]
        }
    ],
    'owner_id': '6OACw4ck88d20TvRFsTO',
    'collaborator_ids': [6, 7, 8],
    'name': 'test',
    'timestamp': datetime.now(),
    'image_url': 'no image rn',
    'done_ids': []
}

user_data = {
    'name': 'advaith',
    'receipt_ids': ['this is fake'],
    'email': 'advaith@gmail.com'
}

# create_receipt(data)
# create_user(user_data)

# delete_user_from_receipt("rhtIUIdC8qVuY7bgE23d", "CiU3HTe3Af9vBYUI9akm")

# print(get_user("rhtIUIdC8qVuY7bgE23d"))
# print(get_user_receipts("6OACw4ck88d20TvRFsTO"))
add_user_to_item("rhtIUIdC8qVuY7bgE23d", "W4ejTKQoeld7awPmcfBm", "6 WING PLATE")


