from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, db
from database import access_db
from PIL import Image
import pytesseract
from database import access_db


app = Flask(__name__)
pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

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
        if 'image' in request.files:
            print(request.files)
            uploaded_image = request.files['image']
            print(uploaded_image)
            try:
                img = Image.open(uploaded_image)
                parsed_text = pytesseract.image_to_string(img)
                print(parsed_text)
                # Parse the text and create a list of items and prices (modify this as needed)
                items = []  # Modify this to extract items and prices from parsed_text

                ref = db.reference('receipts')
                new_receipt_ref = ref.push({"items": items})

                return jsonify({"parsed_text": parsed_text, "message": "Image processed and data sent to Firebase", "receipt_id": new_receipt_ref.key()})
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        else:
            return jsonify({"error": "No image provided in the request"}), 400

                
@app.route('/<userId>', methods=['GET'])
def get_receipts(userId):
    if request.method == 'GET':
        receipts = access_db.get_user_receipts(userId)
        return jsonify({receipts})
       
@app.route('/search/<query>', methods=['GET'])
def search_users(query):
    if request.method == 'GET':
        return jsonify({'results': access_db.search_users(query)})

if __name__ == '__main__':
    app.run(debug=True)