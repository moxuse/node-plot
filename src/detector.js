const cv = require('opencv4nodejs');

class Detector {
  constructor(threshold_) {
    // this.webcam = new cv.VideoCapture(1);
    this.webcam = new cv.VideoCapture(0);
    cv.VideoWriter.fourcc('MJPG')
    this.webcam.set(cv.CAP_PROP_FRAME_WIDTH, 640);
    this.webcam.set(cv.CAP_PROP_FRAME_HEIGHT, 480);
    this.detector = new cv.ORBDetector();
    this.threshold = threshold_;
    // this.descriptor = new cv.AKAZEDetector();
  }

  features (img) {
    // detect keypoints

    // 二値化必要？
    // const binColored = img.threshold(this.threshold, 255, cv.THRESH_BINARY);
    // const keyPoints = this.detector.detect(binColored); 

    const keyPoints = this.detector.detect(img);

    const descriptors = this.detector.compute(img, keyPoints);
    return { keyPoints, descriptors };
  }

  numPoints (showImg) {
    const frame = this.webcam.read();

    const features_ = this.features(frame)
    const res = cv.drawKeyPoints(frame, features_.keyPoints);
    if (showImg) {
      // const binColored = frame.threshold(this.threshold, 85, cv.THRESH_BINARY);
      // cv.imshowWait('keypoints', frame);
    } 
    console.log(features_.keyPoints.length)
    return features_.keyPoints.length
  }
}

module.exports = Detector

