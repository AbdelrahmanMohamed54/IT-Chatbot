const fs = require("fs");
const http = require("http");
const socketIO = require("socket.io");

//const main = http.createServer();
const main = http.createServer((req, res) => {
  // Set the response HTTP header with a status code and content type
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Check the request URL and method
  if (req.url === '/test' && req.method === 'GET') {
    // If the request is to the "/test" path with a GET method
    res.end('Testing route works!\n');
  } else {
    // For all other requests
    res.end('Hello, World---!\n');
  }
});
const io = socketIO(main, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


const availabilityData = JSON.parse(fs.readFileSync("Availability.json"));


function keywordSpottingAlgorithm(input, chatHistory) {
  const carAvailability = availabilityData.car_availability;

  const carStrings = carAvailability.flatMap((car) =>
      car.questions.map((question) => question.toLowerCase())
  );


  const matchedWords = input
      .toLowerCase()
      .split(" ")
      .filter((word) => carStrings.some((carString) => carString.includes(word)));

  if (matchedWords.length === 0) {
    if (!keywordSpottingAlgorithm.consecutiveMisses) {
      keywordSpottingAlgorithm.consecutiveMisses = 0;
    }
    if (keywordSpottingAlgorithm.consecutiveMisses === 4) {
      return "Hello, I am here to assist you!\nHere you can find a list of all cars that we usually have in our showroom, in addition to all services that I, The BMW Chatbot, can provide and assist you with.\n\nCar Models: \n\nBMW 2 Series: BMW 220i\nBMW 3 Series: BMW 320d\nBMW 4 Series: BMW 430i\nBMW 5 Series: BMW 530i\nBMW 6 Series: BMW 640i\nBMW 7 Series: BMW 740i\nBMW 8 Series: BMW 840i\nBMW Z3\nBMW Z4\nBMW Z8\nBMW X1\nBMW X2\nBMW X3\nBMW X4\nBMW X5\nBMW X6\nBMW X7\nBMW i3\nBMW i8\nBMW M2\nBMW M3\nBMW M4\nBMW M5\nBMW M6\nBMW M8\n\n\nMy Services: \n\n- Recommend car models based on customer requirements.\n\n- Check for car availability in our showroom.\n\n- Giving the customer extensive information on any chosen model from the above.\n\n\n** In case you would like me to recommend for you a car model based on your requirements then please give your message in the following format:- \n\nCategory: Luxury/Sports/Electric/High-performance/Crossover\nbody shape: compact-small/Sedan/Coupe-convertible/SUV\nengine type: gasoline/diesel/hybrid/electric\nseat capacity: 2 Seaters/5 seaters/7 Seaters\nprice range: 10k-30k/40k-60k/70-120k----  Please supply me with the car requirements that you would like me to recommend.";
    }
    keywordSpottingAlgorithm.consecutiveMisses++;
    const noMatchResponses = [
      "I apologize for the confusion. Could you please repeat your question?",
      "I'm sorry, I'm having difficulty understanding your inquiry. Can you please rephrase it?",
      "I apologize if I didn't grasp your question correctly. Could you provide more details?",
      "I'm sorry if I'm not following. Can you please provide more information or rephrase your question?",
    ];

    const responseIndex = keywordSpottingAlgorithm.consecutiveMisses - 1;
    return noMatchResponses[responseIndex];
  }

  keywordSpottingAlgorithm.consecutiveMisses = 0;


  let highestMatch = 0;
  let matchedQuestion = "";
  let matchedAnswer = "";
  let followup = "";

  for (const car of carAvailability) {
    for (let i = 0; i < car.questions.length; i++) {
      const question = car.questions[i];
      const answerIndex = Math.floor(Math.random() * car.answers.length);
      const answer = car.answers[answerIndex];
      const currentFollowup = car.followup;

      const questionWords = question.toLowerCase().split(" ");
      const matchCount = questionWords.filter((word) =>
          input.toLowerCase().split(" ").includes(word)
      ).length;

      if (matchCount > highestMatch) {
        highestMatch = matchCount;
        matchedQuestion = question;
        matchedAnswer = answer;
        followup = currentFollowup;
      } else if (matchCount === highestMatch) {
        matchedQuestion = question;
        matchedAnswer = answer;
        followup = currentFollowup;
      }
    }
  }


  const previousQuestion = chatHistory.find(
      (item) => item.question === matchedQuestion
  );

  if (previousQuestion) {

    const availableAnswers = carAvailability.find((car) =>
        car.questions.includes(matchedQuestion)
    ).answers;
    const usedAnswers = chatHistory
        .filter((item) => item.question === matchedQuestion)
        .map((item) => item.answer);
    const unusedAnswers = availableAnswers.filter(
        (answer) => !usedAnswers.includes(answer)
    );

    if (unusedAnswers.length > 0) {
      matchedAnswer =
          unusedAnswers[Math.floor(Math.random() * unusedAnswers.length)];
    }
  }


  chatHistory.push({ question: matchedQuestion, answer: matchedAnswer });


  if (matchedQuestion && matchedAnswer && followup) {
    return {
      question: matchedQuestion,
      answer: matchedAnswer,
      followup: followup,
    };
  } else {
    return { answer: "No matching question found." };
  }
}


const port = process.env.PORT || 8000

main.listen(port, () => {

  io.on("connection", (socket) => {
    console.log("A user connected");


    socket.on("message", (message) => {
      console.log("received a message " + message);

      const response = keywordSpottingAlgorithm(message, []);


      socket.emit("message", response);
    });


    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  console.log(`Server listening on port ${port}`);
});
