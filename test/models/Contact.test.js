import { expect } from 'chai';
import models from '../../src/models/index';

describe('Contact', () => {
  describe('#validate', () => {
    it('should return error if the name is 0 character', async () => {
      const Contact = await models.Contact.build({
        name: '',
        email: 'wijayafernando23@yahoo.com',
        phoneNumber: +6287012323421,
      });
      return Contact.validate().then(() => {
        expect.fail();
      }).catch((error) => {
        expect(error.message).to.eq('Validation error: Validation len on name failed');
      });
    });

    it('should return error if the name is more than 20 character', async () => {
      const Contact = await models.Contact.build({
        name: 'mrfernandowiwjayahendry',
        email: 'wijayafernando23@yahoo.com',
        phoneNumber: +6287012323421,
      });
      return Contact.validate().then(() => {
        expect.fail();
      }).catch((error) => {
        expect(error.message).to.eq('Validation error: Validation len on name failed');
      });
    });

    it('should return error if the email is 0 character', async () => {
      const Contact = await models.Contact.build({
        name: 'fernandowijaya',
        email: '',
        phoneNumber: +6287012323421,
      });
      return Contact.validate().then(() => {
        expect.fail();
      }).catch((error) => {
        expect(error.message).to.eq('Validation error: Validation len on email failed');
      });
    });

    it('should return error if the email is 40 character', async () => {
      const Contact = await models.Contact.build({
        name: 'fernandowijaya',
        email: 'mrcoolzzzzzcollzzjeniususeraccountpro@lalala.cloud.com',
        phoneNumber: +6287012323421,
      });
      return Contact.validate().then(() => {
        expect.fail();
      }).catch((error) => {
        expect(error.message).to.eq('Validation error: Validation len on email failed');
      });
    });
  });
});
