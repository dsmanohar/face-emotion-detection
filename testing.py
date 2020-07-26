from tensorflow.keras.models import load_model
import numpy as np
import cv2
import tensorflow
#length=35887   #emotion=6
def predict(img):
        img = cv2.resize(img, (48, 48))
        img = img / 255
        model=load_model('softmaxmodel.h5')
        img = np.expand_dims(img, axis=0)
        img = np.expand_dims(img, axis=-1)
        return(model.predict(img))
