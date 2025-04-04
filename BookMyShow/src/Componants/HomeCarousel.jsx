import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const items = [
	<img src="https://assetscdn1.paytm.com/images/catalog/view_item/2997588/5971521759863447.jpeg?format=webp&imwidth=1750" style={{ width: "100vw", height: "50vh", objectFit: "cover" }}   />,
	<img src="https://assetscdn1.paytm.com/images/catalog/view_item/2980439/3799577469607947.jpg?format=webp&imwidth=1750" style={{ width: "100vw", height: "50vh", objectFit: "cover" }}   />,
	<img src="https://assetscdn1.paytm.com/images/catalog/view_item/2992905/5698335092881302.jpg?format=webp&imwidth=1750" style={{ width: "100vw", height: "50vh", objectFit: "cover" }}   />,
	<img src="https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1743072700433_bestsellerwebnew.jpg" style={{ width: "100vw", height: "50vh", objectFit: "cover" }}   />,
];

const HomeCarousel = () =>

<AliceCarousel mouseTracking items={items} disableButtonsControls autoPlay autoPlayInterval={1000} infinite
style={{ width: "100vw", height: "50vh"}}/>;

export default HomeCarousel;