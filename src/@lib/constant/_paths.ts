export const paths = {
  root: '/',
  projectOverview: {
    root: '/projects-overview',
    list: '/projects-overview/list',
    slug: (id) => `/projects-overview/${id}`,
  },
  TaskList: {
    root: '/task/list',
  },
  kanban: {
    root: '/kanban',
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
};
