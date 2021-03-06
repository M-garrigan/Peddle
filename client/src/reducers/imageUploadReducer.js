const ImageUploadReducer = (state = {
  imageUploadProcessing: false,
  imageUrls: []
}, action) => {
  switch (action.type) {
    case 'IMAGE_UPLOAD_START':
      return Object.assign({}, state, {imageUploadProcessing: true});
    case 'IMAGE_UPLOAD_COMPLETE':
      return Object.assign({}, state, {imageUploadProcess: false, imageUrls: [...state.imageUrls, action.payload.url]});
    case 'CLEAR_URLS':
      return Object.assign({}, state, {imageUrls: []});
    default:
      return state;
  }
};

export default ImageUploadReducer;