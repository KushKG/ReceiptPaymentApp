from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import re

from datetime import datetime

from database import access_db
from database import modify_db
from database.setup_db import db
from database.modify_db import create_receipt

app = Flask(__name__)
# pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

@app.route('/')
def hello_world():
    return 'Hello, Flask!'



@app.route('/update_receipt/<receiptId>', methods=['PUT'])
def update_receipt(receiptId):
    if request.method == 'PUT':
        data = request.get_json()
        return jsonify({"receiptId" : receiptId})

        
@app.route('/add_receipt/<userId>', methods=['POST'])
def upload_receipt_data(userId):
    if 'image' not in request.files:
        return jsonify({'message': 'No file part'})

    image = request.files['image']
    if image.filename == '':
        return jsonify({'message': 'No selected file'})
    
    image.save('receipt.jpg')

    if 'receipt_name' not in request.form:
        return jsonify({'message': 'No receipt name'})
    
    receipt_name = request.form['receipt_name']
    if receipt_name == '':
        return jsonify({'message': 'No receipt name'})
    
    if 'user_list' not in request.form:
        return jsonify({'message': 'No user list'})
    
    user_list = request.form['user_list']
    if user_list == '':
        return jsonify({'message': 'No user list'})
    
    img = Image.open(image)
    parsed_text = pytesseract.image_to_string(img)

    item_pattern = re.compile(r'^(.*?) (\d{12}) (\d+\.\d{2}) [PX]$', re.MULTILINE)
        
    matches = item_pattern.findall(parsed_text)
    item_list = []
    for match in matches:
        name_item = match[0]
        price = match[2]
                
        item = {
            "name": name_item,
            "price": price,
            "user_ids": []
        }
        print(item)
                
        item_list.append(item)
            
    new_receipt = {
        "name": receipt_name,
        "items": item_list,
        "timestamp": datetime.now(),
        "owner_id": userId,
        "collaborator_ids": user_list.split(","),
        "done_ids": []
    }
    
    receipt_id = create_receipt(new_receipt)
    
    return ({"id": receipt_id})

@app.route('/get_receipt/<receiptId>', methods=['GET'])
def get_receipt(receiptId):
    if request.method == 'GET':
        receipt = access_db.get_receipt(receiptId)
        return receipt
                
@app.route('/<userId>', methods=['GET'])
def get_receipts(userId):
    if request.method == 'GET':
        receipts = access_db.get_user_receipts(userId)
        return receipts
       
@app.route('/search/<query>', methods=['GET'])
def search_users(query):
    if request.method == 'GET':
        return jsonify({'results': access_db.search_users(query)})

@app.route('/send_items/<userId>/<receiptId>', methods=['POST'])
def send_items(userId, receiptId):
    # print("send_items")

    if request.method == 'POST':
        data = request.get_json()
        print(data)
        receipt = access_db.get_receipt(receiptId)
        for item in receipt['items']:
            print(data)
            print(item['name'])
            if (item['name'] in data):
                modify_db.add_user_to_item(userId, receiptId, item['name'])
            else:
                modify_db.delete_user_item(userId, receiptId, item['name'])
        
        return jsonify({"userId" : userId, "receiptId" : receiptId})

@app.route('/getTotal/<receiptId>/<userId>', methods=['GET'])
def getTotal(receiptId, userId):
    receipt = get_receipt(receiptId)
    
    if userId != receipt['owner_id']:
        return jsonify({"total": getTotalForCollaborator(receipt, userId)})
    else:
        return jsonify({"total": getTotalToBePaidToOwner(receipt, userId)})
    
def getTotalToBePaidToOwner(receipt, userId):    
    receipt_items = receipt['items']
    receipt_collaborators = receipt['collaborator_ids']
    
    totalForCollaborators = 0
    
    for collaboratorId in receipt_collaborators:
        totalForCollaborators += getTotalForCollaborator(receipt, collaboratorId)
        
   
    return totalForCollaborators

def getTotalForCollaborator(receipt, userId):
    receipt_items = receipt['items']
    
    total = 0
    
    for item in receipt_items:
        user_ids_for_item = item['user_ids']
        num_users_sharing = len(user_ids_for_item)
        
        if userId in user_ids_for_item:
            total += (float(item['price'])) / num_users_sharing 
        
    return total

@app.route('/getItems/<receiptId>/<userId>', methods=['GET'])
def getItems(receiptId, userId):
    if (request.method == 'GET'):
        receipt = get_receipt(receiptId)
        names = []
        items = receipt['items']
        for item in items:
            if userId in item['user_ids']:
                names.append(item['name'])
    
    return jsonify({'names': names})

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)