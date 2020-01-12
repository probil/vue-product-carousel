import { Selector } from 'testcafe';

// eslint-disable-next-line no-unused-expressions
fixture`Default behaviour`
  .page`http://localhost:8080`;

test('Remove element', async (t) => {
  await t
    .click(Selector('.three.columns').find('button').withText('X'))
    .expect(Selector('.vue-product-carousel .swipe-wrap>div').count).eql(4, 'Removes preview')
    .expect(Selector('.main-image.responsive-image').getStyleProperty('background-image'))
    .contains('http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457888/pexels-photo-168766_zrbvds.jpg');
});

test('Add element', async (t) => {
  const NEW_IMAGE_URL = 'https://www.itl.cat/pngfile/big/0-7755_background-wallpaper.jpg';
  await t
    .typeText(Selector('.nine.columns input[placeholder="Add image url here..."]'), NEW_IMAGE_URL)
    .click(Selector('button').withText('ADD'))
    .expect(Selector('.swipe-wrap > div').count).eql(6, 'Adds item to preview')
    .expect(Selector('.swipe-thumbnail').nth(5).getStyleProperty('background-image'))
    .contains(NEW_IMAGE_URL, 'Appears in preview as the last item')
    .click(Selector('.swipe-thumbnail').nth(5))
    .expect(Selector('.main-image.responsive-image').getStyleProperty('background-image'))
    .contains(NEW_IMAGE_URL, 'Switches image in current slide on click');
});

test('Zoom', async (t) => {
  await t
    .expect(Selector('.vue-product-carousel').getAttribute('class')).eql('vue-product-carousel', 'Doesn\'t contain `zoomed` class by default')
    .click(Selector('.main-image.responsive-image'))
    .expect(Selector('.vue-product-carousel').getAttribute('class'))
    .eql('vue-product-carousel zoomed', 'Adds `zoomed` class on zoom')
    .click(Selector('.main-image.responsive-image'))
    .expect(Selector('.vue-product-carousel').getAttribute('class'))
    .eql('vue-product-carousel', 'Removes `zoomed` class after second click on the main slide');
});
