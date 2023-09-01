import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard',
  },
  {
    routeLink: 'users',
    icon: 'fal fa-user',
    label: 'Users',
    items: [
      {
        routeLink: 'users/created',
        label: 'Created'
      },
      {
        routeLink: 'users/read',
        label: 'Read'
      },
      {
        routeLink: 'users/update',
        label: 'Updated'
      },
      {
        routeLink: 'users/delete',
        label: 'Delete'
      },
    ]
  },
  {
    routeLink: 'posts',
    icon: 'fal fa-file',
    label: 'Posts',
    items: [
      {
        routeLink: 'posts/created',
        label: 'Created'
      },
      {
        routeLink: 'posts/read',
        label: 'Read'
      },
      {
        routeLink: 'posts/update',
        label: 'Updated'
      },
      {
        routeLink: 'posts/delete',
        label: 'Delete'
      },
    ]
  },
];