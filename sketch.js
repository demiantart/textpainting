let inputText = "";
let features = {};

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvasContainer');
  noLoop(); // Wait for trigger
}

function generateTexture() {
  inputText = document.getElementById("inputText").value;
  features = extractTextFeatures(inputText);
  redraw();
}

function draw() {
  if (!inputText) return;

  background(240);
  noStroke();

  // Set color based on sentiment
  if (features.sentiment > 0) fill(255, 100, 100, 100); // positive = red
  else if (features.sentiment < 0) fill(100, 100, 255, 100); // negative = blue
  else fill(100, 255, 100, 100); // neutral = green

  for (let i = 0; i < features.shapeCount; i++) {
    let x = random(width);
    let y = random(height);
    let size = features.avgSentenceLength * random(0.5, 1.5);
    ellipse(x, y, size, size);
  }
}

function extractTextFeatures(text) {
  let sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  let words = text.match(/\b(\w+)\b/g) || [];
  let wordSet = new Set(words.map(w => w.toLowerCase()));
  let avgSentenceLength = words.length / sentences.length;
  let lexicalDiversity = wordSet.size / words.length;

  // Dummy sentiment scoring
  let positiveWords = ['love', 'great', 'happy', 'beautiful'];
  let negativeWords = ['hate', 'bad', 'angry', 'ugly'];
  let sentiment = 0;
  words.forEach(w => {
    if (positiveWords.includes(w.toLowerCase())) sentiment++;
    if (negativeWords.includes(w.toLowerCase())) sentiment--;
  });

  return {
    avgSentenceLength: avgSentenceLength,
    lexicalDiversity: lexicalDiversity,
    shapeCount: int(lexicalDiversity * 500),
    sentiment: sentiment
  };
}
