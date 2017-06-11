import { expect } from 'chai';
import imageService from './imageService';

jest.dontMock('@google-cloud/storage');

describe('Image Service', () => {

  it('should return Content-Type, "application/json" when requesting the default json headers', () => {

    const imageName = '197403f0-4e60-11e7-9dc6-99706725ced7';
    const expected = 'https://storage.googleapis.com/temp-wr-item-images/197403f0-4e60-11e7-9dc6-99706725ced7.png';

    const actual = imageService.imageUrl(imageName);

    expect(actual).equals(expected);

  });

});
