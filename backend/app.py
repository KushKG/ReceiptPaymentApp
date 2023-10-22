from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, db
from database import access_db
from PIL import Image
import pytesseract
import easyocr
import re
from datetime import datetime

app = Flask(__name__)

# cred = credentials.Certificate('path/to/your-service-account-key.json')
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://your-firebase-project.firebaseio.com'
# })

@app.route('/')
def hello_world():
    return 'Hello, Flask!'

@app.route('/update_receipt/<receiptId>', methods=['PUT'])
def update_receipt(receiptId):
    if request.method == 'PUT':
        data = request.get_json()
        return jsonify({"receiptId" : receiptId})
        
@app.route('/create_receipt/<userId>', methods=['POST'])
def create_receipt(userId):
    if request.method == 'POST':
        # receipt_data = request.get_json()

        if 'image' in request.files:
            uploaded_image = request.files['image']

            # Process the image using pytesseract
            try:
                img = Image.open(uploaded_image)
                parsed_text = pytesseract.image_to_string(img)
                print(parsed_text + "\n\n" + userId)
                return jsonify({"parsed_text": parsed_text})
                # Parse the text and create a list of items and prices (modify this as needed)
                items = []

                ref = db.reference('receipts')
                new_receipt_ref = ref.push({"items": items})

                return jsonify({"message": "Image processed and data sent to Firebase", "receipt_id": new_receipt_ref.key()})
            except Exception as e:
                return jsonify({"error": str(e)}), 500
            
        else:
            return jsonify({"hello": "hello"})
                
@app.route('/<userId>', methods=['GET'])
def get_receipts(userId):
    if request.method == 'GET':
        receipts = access_db.get_user_receipts(userId)
        return receipts


@app.route('/search/<query>', methods=['GET'])
def search_users(query):
    if request.method == 'GET':
        return jsonify({'results': access_db.search_users(query)})

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
    print("here")
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
        "collaborator_ids": user_list,
        "done_ids": []
    }
    
    receipt_id = create_receipt(new_receipt)
    
    return ({"id": receipt_id})

    
if __name__ == '__main__':
    app.run(host= '172.20.10.3', debug=True)