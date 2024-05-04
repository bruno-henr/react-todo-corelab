import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get('http://localhost:3003/v1/api/task', () => {
    return HttpResponse.json({
      "data": [
        {
          "id": "673e4122-37f1-4029-a370-1bd082e00cf1",
          "created_at": "2024-05-01T23:26:09.597Z",
          "updated_at": "2024-05-01T23:26:09.597Z",
          "title": "Estudar javascript",
          "content": "Descrição da tarefa...",
          "favorite": true,
          "color": "#B9FFDD"
        },
        {
          "id": "673e4122-37f1-4029-a370-1bd082e00cf1",
          "created_at": "2024-05-01T23:26:09.597Z",
          "updated_at": "2024-05-01T23:26:09.597Z",
          "title": "Estudar Java",
          "content": "Descrição da tarefa...",
          "favorite": false,
          "color": "#B9FFDD"
        },
      ],
      "has_error": false,
      "error": null
    })
  }),
]