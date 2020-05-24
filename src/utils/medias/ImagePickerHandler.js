import ImagePicker from 'react-native-image-crop-picker';

export default class ImagePickerHandler {
  static async mediaPicker() {
    const settings = {
      width: 300,
      height: 400,
      multiple: true,
      mediaType: 'image',
    };
    try {
      const result = await ImagePicker.openPicker(settings);
      return result;
    } catch (e) {
      console.log('Deu ruim: ', e);
    }
  }

  static async openCamera() {
    const settings = {
      width: 300,
      height: 400,
      mediaType: 'image',
    };
    try {
      const result = await ImagePicker.openCamera(settings);
      return result;
    } catch (e) {
      console.log('Deu ruim: ', e);
    }
  }
}
