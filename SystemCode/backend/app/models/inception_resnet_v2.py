from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input
from tensorflow.keras.applications import InceptionResNetV2
from tensorflow.keras.applications.inception_resnet_v2 import preprocess_input

from . import _utils


MODEL_NAME = 'inception_resnet_v2'
IMAGE_SIZE = 299


def load_model(model_version = 'default'):
  return _utils.load_model(MODEL_NAME, model_version)


def build_model(classes = 2):
  inputs = Input(shape = (IMAGE_SIZE, IMAGE_SIZE, 3))
  x = preprocess_input(inputs)
  x = InceptionResNetV2(weights=None, classes=classes)(x)
  model = Model(inputs=inputs, outputs=x)
  model.compile(loss='categorical_crossentropy', metrics=['accuracy'])
  return model

