export type Id = string | number;

export type Column = {
  id: Id;
  title: string | number;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
  description: string;
  deadline: string;
  assignedMember: string[];
};
