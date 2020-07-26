import base64
from PIL import Image
from program import func
import cv2
import numpy as np
#0-angry 1-disgust 2-fear 3 -happy 4-sad 5-ssuprise 6-neutral
import io
from tensorflow.keras.models import load_model
from testing import predict
from flask import Flask,render_template,request,make_response,jsonify,redirect,url_for
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.secret_key="chatapp"
@app.route('/',methods=['POST','GET'])
def hello_world():
    if request.method=='GET':
        return (render_template("facedetection.html"))
    if request.method=='POST':
        a=request.get_json()
        imgdata = base64.b64decode(str(a['image'].split(',')[1]))
        image = Image.open(io.BytesIO(imgdata))
        image=np.array(image)
        image=cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
        predictimg=func(image)

        if(type(predictimg) is np.ndarray):
            cv2.imshow('a', predictimg)
            cv2.waitKey(0)
            return make_response({"emotion": "true", "ans":str(np.argmax(predict(predictimg)))})
        elif predictimg==1:
            return (make_response({"emotion":"multipleimages"}))
        else:
            return (make_response(({"emotion":"please show your face to camera"})))

if __name__== "__main__":
    app.run(debug=True)