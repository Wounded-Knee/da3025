const importedConversation = {
  "defaultChildren": [
    {
      "id": 0,
      "continue": true
    },
    {
      "id": 1,
      "freeText": true
    }
  ],
  "users": [
    {
      "id": 0,
      "name": "Joel",
      "color": "c17bc6"
    },
    {
      "id": 1,
      "name": "Cake",
      "color": "7bc6c1"
    }
  ],
  "nodes": [
    {
      "id": 1000,
      "authorId": 0,
      "text": "He walked the dog."
    },
    {
      "id": 1001,
      "authorId": 0,
      "text": "Then, the dog took a shit.",
      "parentId": 1000
    },
    {
      "id": 1002,
      "authorId": 1,
      "text": "What was the dog's name?",
      "parentId": 1000
    },
    {
      "id": 1003,
      "authorId": 0,
      "text": "The dog's name was Totoro!",
      "parentId": 1002
    },
    {
      "id": 1004,
      "authorId": 0,
      "childId": 1001,
      "parentId": 1003
    },
    {
      "id": 1005,
      "authorId": 1,
      "text": "That's a funny name...",
      "parentId": 1003
    },
    {
      "id": 2000,
      "authorId": 0,
      "text": "There was a helicopter."
    },
    {
      "id": 2001,
      "authorId": 1,
      "text": "Oh",
      "parentId": 1003
    },
    {
      "id": 2002,
      "authorId": 1,
      "text": "I don't understand that name.",
      "parentId": 1003
    },
    {
      "id": 2003,
      "authorId": 1,
      "text": "What color was the dog?",
      "parentId": 1000
    },
    {
      "id": 2004,
      "authorId": 1,
      "text": "What breed?",
      "parentId": 1000
    },
    {
      "id": 2005,
      "authorId": 1,
      "text": "Why do dogs always need to be walked?",
      "parentId": 1000
    },
    {
      "id": 2006,
      "authorId": 1,
      "text": "What the actual fuck?",
      "parentId": 1000
    },
    {
      "id": 2007,
      "authorId": 1,
      "text": "Nuh uh, that's a movie!",
      "parentId": 1003
    },
    {
      "id": 2008,
      "authorId": 1,
      "text": "I always have to walk my dog.",
      "parentId": 1000
    },
    {
      "id": 2009,
      "authorId": 1,
      "text": "He's been gone too long!!!",
      "parentId": 1000
    }
  ]
};

export default importedConversation;
