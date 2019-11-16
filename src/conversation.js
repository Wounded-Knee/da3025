const conversation = {
  defaultChildren: [
    { id: 0, continue: true },
    { id: 1, freeText: true },
  ],
  users: [
    { id: 0, name: 'Joel', color: "c17bc6" },
    { id: 1, name: 'Cake', color: "7bc6c1" },
  ],
  nodes: [
    { id: 1000, authorId: 0, text: 'He walked the dog.'},
    { id: 1001, authorId: 0, text: 'Then, the dog took a shit.', parentId: 1000 },
    { id: 1002, authorId: 1, text: 'What was the dog\'s name?', parentId: 1000 },
    { id: 1003, authorId: 0, text: 'The dog\'s name was Totoro!', parentId: 1002 },
    { id: 1004, authorId: 0, childId: 1001, parentId: 1003},
    { id: 1005, authorId: 1, text: 'That\'s a funny name...', parentId: 1003 },

  ]
};

export default conversation;
