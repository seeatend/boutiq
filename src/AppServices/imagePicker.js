import ImagePicker from 'react-native-image-picker';
// import * as Cropper from 'react-native-image-crop-picker';

const settings = {
  title: 'Select Avatar',
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...',
  chooseFromLibraryButtonTitle: 'Choose from Library...',
  cameraType: 'back',
  mediaType: 'photo',
  videoQuality: 'high',
  durationLimit: 10,
  maxWidth: 1200,
  maxHeight: 1200,
  aspectX: 2,
  aspectY: 1,
  quality: 0.9,
  angle: 0,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const imagePicker = {
  show(options = {}) {
    return new Promise((resolve, reject) => {
      ImagePicker.showImagePicker(Object.assign(settings, options), (response) => {
        const result = {
          source: null,
          type: null,
          message: '',
        };
        if (response.didCancel) {
          result.type = 'UserCancel';
          result.message = 'User cancelled image picker';
        } else if (response.error) {
          return reject({
            type: 'Error',
            message: response.error,
          });
        } else if (response.customButton) {
        } else {
          result.source = {
            uri: `data:image/jpeg;base64,${response.data}`,
            isStatic: true,
          };
        }
        return resolve(result);
      });
    });
  },
};
