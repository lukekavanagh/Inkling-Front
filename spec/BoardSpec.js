describe("createBubble", function() {

  beforeAll(function () {
    var e = {
      pageY : 88,
      pageX : 95
    }
    createBubble(e);
  });

  afterAll(function () {
    board.bubbles=[];
  });
  
  it("renders a bubble //test?" ) 


  it("new bubble has GUID bubbleId", function () {
    expect(board.bubbles[0].bubbleId.length).toBeGreaterThan(8);
    expect(board.bubbles[0].bubbleId).toEqual(jasmine.any(String));
  })
  
  it("adds a bubble to board.bubbles[]", function() {
    expect(board.bubbles.length).toEqual(1);
  });
});
