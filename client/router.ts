import {Router} from '@vaadin/router';

export const router = new Router(document.querySelector('.root'));


router.setRoutes([
  {path: '/', component: 'my-home'},
  {path: '/start', component: 'my-start'},
  {path: '/start/room', component: 'my-room'},
  ]);