import {Router} from '@vaadin/router';

export const router = new Router(document.querySelector('.root'));


router.setRoutes([
  {path: '/', component: 'my-home'},
  {path: '/new-game', component: 'new-game'},
  {path: '/room', component: 'my-room'},
  {path: '/start', component: 'my-start'},
  {path: '/play', component: 'my-play'},
  {path: '/game', component: 'my-game'},
  {path: '/results', component: 'my-results'},
  ]);