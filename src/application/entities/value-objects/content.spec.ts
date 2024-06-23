import { Content } from './content';

describe('', () => {
  it('should be able to create a notification content', async () => {
    const constent = new Content('Você recebeu uma solicitação de amizade');

    expect(constent).toBeTruthy();
  });

  it('should be able to create a notification with less than  characters', () => {
    expect(() => {
      new Content('aaa');
    }).toThrow();
  });

  it('should not be able to create a notificaton with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
