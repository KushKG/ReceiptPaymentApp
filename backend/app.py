from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, db
from database import access_db
from PIL import Image
import pytesseract
import easyocr

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
        return jsonify({"userId" : userId})


@app.route('/search/<query>', methods=['GET'])
def search_users(query):
    if request.method == 'GET':
        return jsonify({'results': access_db.search_users(query)})
    
if __name__ == '__main__':
    app.run(debug=True)