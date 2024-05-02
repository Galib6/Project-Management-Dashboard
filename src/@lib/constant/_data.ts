import { Task } from '@modules/kanbanBoard/type/types';

export const userName = [
  {
    name: 'Sherry Bartell',
    id: '1',
  },
  {
    name: 'Samuel Kemmer',
    id: '2',
  },
  {
    name: 'Lionel Haag',
    id: '3',
  },
  {
    name: 'Wilbur Effertz',
    id: '4',
  },
  {
    name: 'Marianne Hauck',
    id: '5',
  },
  {
    name: 'Darlene Casper',
    id: '6',
  },
  {
    name: 'Jenna Douglas',
    id: '7',
  },
  {
    name: 'Mrs. Mabel Harris PhD',
    id: '8',
  },
  {
    name: 'Dr. Cameron Jacobi',
    id: '9',
  },
  {
    name: 'Emilio Hilll',
    id: '10',
  },
];

export const defaultTasks: Task[] = [
  {
    id: '1',
    columnId: 'todo',
    content: 'Identify Admin APIs',
    description:
      'The objective of this task is to identify and list out all the necessary admin APIs required for the development of the dashboard. This includes APIs for managing user roles, permissions, and other administrative functionalities.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '2',
    columnId: 'todo',
    content: 'User Registration with OTP and Email/Phone Confirmation',
    description:
      'This task involves developing a robust user registration system that includes email and phone number confirmation. Upon successful registration, an OTP (One-Time Password) will be delivered via SMS for account activation.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '3',
    columnId: 'doing',
    content: 'Perform Security Testing',
    description:
      'Perform comprehensive security testing to identify and mitigate potential vulnerabilities in the application. This includes testing for common web application vulnerabilities such as SQL injection, cross-site scripting (XSS), and others.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '4',
    columnId: 'doing',
    content: 'Analyze Competitor Products',
    description:
      'Conduct a thorough analysis of competitor products and features to gain insights into market trends, user preferences, and potential areas for improvement or differentiation.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '5',
    columnId: 'done',
    content: 'Document UI Kit',
    description:
      'Develop comprehensive documentation for the UI kit, detailing its components, usage guidelines, and best practices for maintaining consistent and user-friendly interfaces.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '6',
    columnId: 'done',
    content: 'Dev Team Meeting',
    description:
      'Organize and facilitate a development team meeting to discuss project progress, address any challenges or blockers, and align on upcoming milestones and priorities.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '7',
    columnId: 'done',
    content: 'Deliver Dashboard Prototype',
    description:
      'Develop and deliver a functional prototype of the dashboard, showcasing the core features, user interface, and overall user experience.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '8',
    columnId: 'todo',
    content: 'Optimize Application',
    description:
      "Identify and implement strategies to enhance the application's performance, including optimizing code, leveraging caching mechanisms, and minimizing resource utilization.",
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '9',
    columnId: 'todo',
    content: 'Implement Data Validation',
    description:
      'Implement robust data validation mechanisms to ensure the integrity and consistency of user input, preventing potential security vulnerabilities and data corruption.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '10',
    columnId: 'todo',
    content: 'Design Database Schema',
    description:
      'Design an efficient and scalable database schema to store and manage application data, considering data relationships, performance, and future growth requirements.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '11',
    columnId: 'todo',
    content: 'Integrate SSL Certificates',
    description:
      'Integrate SSL (Secure Sockets Layer) web certificates into the application workflow to ensure secure data transmission and enhance user trust through HTTPS protocol.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '12',
    columnId: 'doing',
    content: 'Implement Error Logging',
    description:
      'Develop a robust error logging and monitoring system to track and analyze application errors, facilitating debugging and improving overall system reliability.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
  {
    id: '13',
    columnId: 'doing',
    content: 'Design Responsive UI',
    description:
      'Design and implement a responsive user interface that adapts seamlessly to different screen sizes and devices, ensuring an optimal user experience across various platforms.',
    assignedMember: ['Emilio Hilll', 'Dr. Cameron Jacobi', 'Mrs. Mabel Harris PhD'],
    deadline: '2024-12-12',
  },
];
