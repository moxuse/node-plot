const cv = require('opencv4nodejs');

const features = (img) => {
  // detect keypoints
  const detector = new cv.ORBDetector();
  const keyPoints = detector.detect(img);

  const descriptors = detector.compute(img, keyPoints);
  return { keyPoints, descriptors };
};

const numPoints = () => {
  const webcam = new cv.VideoCapture(1);
  cv.VideoWriter.fourcc('MJPG')
  webcam.set(cv.CAP_PROP_FRAME_WIDTH, 640);
  webcam.set(cv.CAP_PROP_FRAME_HEIGHT, 480);
  const frame = webcam.read();
  
  const features_ = features(frame)
  const res = cv.drawKeyPoints(frame, features_.keyPoints);
  cv.imshowWait('keypoints', res);
  console.log(features_.keyPoints.length)
  return features_.keyPoints.length
}

module.exports = { numPoints }