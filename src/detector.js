const cv = require('opencv4nodejs');

class Detector {
  constructor() {
    // this.webcam = new cv.VideoCapture(1);
    this.webcam = new cv.VideoCapture(0);
    cv.VideoWriter.fourcc('MJPG')
    this.webcam.set(cv.CAP_PROP_FRAME_WIDTH, 640);
    this.webcam.set(cv.CAP_PROP_FRAME_HEIGHT, 480);
    this.detector = new cv.ORBDetector();
  }

  features (img) {
    // detect keypoints
    const keyPoints = this.detector.detect(img);

    const descriptors = this.detector.compute(img, keyPoints);
    return { keyPoints, descriptors };
  }

  numPoints (showImg) {
    const frame = this.webcam.read();
    
    const features_ = this.features(frame)
    const res = cv.drawKeyPoints(frame, features_.keyPoints);
    if (showImg) {
      cv.imshowWait('keypoints', res);
    } 
    console.log(features_.keyPoints.length)
    return features_.keyPoints.length
  }
}

module.exports = Detector
