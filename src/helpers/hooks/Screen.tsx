import {
  Dimensions,
  NativeModules,
  Platform,
  StatusBar,
  useWindowDimensions as RNScreenDimensions,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

enum ScreenOrientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

const useWindowDimensions = () => {
  let { height, width, scale } = RNScreenDimensions(),
    { height: screenHeight, width: screenWidth } = Dimensions.get('screen'),
    statusBarHeight: number = StatusBar.currentHeight ?? NativeModules.StatusBarManager.HEIGHT;

  width = Math.min(height, width);
  height = Math.max(height, width);

  const orientation: ScreenOrientation = height > width ? ScreenOrientation.PORTRAIT : ScreenOrientation.LANDSCAPE,
    maxWidth: number = 500;

  // Calculate NavBarHeight
  let navBarHeight: number;
  if (Platform.OS == 'android') {
    navBarHeight = screenHeight - height;

    // if the navbar height equals to 48, is the standard height
    if (navBarHeight !== 48) {
      // if not, it could be that the window height is not including the status bar height, so we try substracting it
      if (navBarHeight - statusBarHeight > 0) {
        // if the number is positive, then we are right
        navBarHeight = navBarHeight - statusBarHeight;
      }
      // if the number is negative, then the status bar height was included, but the navbar height was not the standard,
      // is smaller, and its probably the gestures bar which has an aproximate height of 15
    }
  } else {
    // iOS
    // iPad with virtual buttom has 20px height
    if (DeviceInfo.isTablet()) navBarHeight = 20;

    // iPhone with virtual button has 34px height
    navBarHeight = DeviceInfo.hasNotch() ? 34 : 0;
  }

  return { height, width, screenWidth, screenHeight, orientation, maxWidth, scale, navBarHeight, statusBarHeight };
};

export default useWindowDimensions;
