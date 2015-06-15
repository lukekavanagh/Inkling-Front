describe("ApiFacade", function() {

  describe("postBoard()", function() {
    it("returns a new board", function() {
      var newBoard = ApiFacade.postBoard();
      expect(newBoard._id.length).toBeGreaterThan(6);
      expect(newBoard.bubbles.length).toEqual(0);
      expect(newBoard.connections.length).toEqual(0);
    })
  })

  describe("getboard()", function(){
    it("returns statusCode = 200", function(){
      var boardId = "kljafds987ahu"
      var response = ApiFacade.getBoard(boardId);
      expect(response.status).toEqual(200);
    })
    it("returns bloody great board object")
  })

  describe("putBoard()", function(data) {
    it("returns an updated board", function() {
        var updatedBoard = ApiFacade.putBoard();
        expect(updatedBoard.message.length).toBeGreaterThan(6);
      var board = {

            "_id": "55710b225f229a074eb5fddd",
            "__v": 2,
            "connections": [{
            "startBubbleId": "978351yedfg980",
            "endBubbleId": "9788923edfg932",
            "_id": "55711c8cbc28c30d52fdec1c"
          },

          {
            "startBubbleId": "978wer9io890weur0",
            "endBubbleId": "klsooiuiosdfsd",
          }],

            "bubbles": [{
            "bubbleId": "98723hooih2348",
            "heading": "idea#291",
            "content": "help, I'm stuck in a bubble",
            "_id": "5571116e1578f5ea505fe932",
            "size": {
              "top": 91,
              "left": 87
            },
            "location": {
              "top": 91,
              "left": 87
            }
          },

          {
            "bubbleId": "98723hooih2348",
            "heading": "idea#291",
            "content": "help, I'm stuck in a bubble",
            "size": {
              "top": 91,
              "left": 87
            },

            "location": {
              "top": 91,
              "left": 87
            }
          }

        ]
      }
    })

    })
});