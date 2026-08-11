/* =========================================
   ELEMENTS
========================================= */

const envelope = document.getElementById("envelope");

const instruction = document.getElementById("instruction");

const yesBtn = document.getElementById("yesBtn");

const noBtn = document.getElementById("noBtn");

const answerButtons = document.getElementById("answerButtons");

const questionTitle = document.getElementById("questionTitle");

const questionText = document.getElementById("questionText");

/* =========================================
   STEPS
========================================= */

const steps = [
  document.getElementById("step0"),
  document.getElementById("step1"),
  document.getElementById("step2"),
  document.getElementById("step3"),
  document.getElementById("step4"),
];

const finalStep = document.getElementById("finalStep");

/* =========================================
   INPUTS
========================================= */

const dateInput = document.getElementById("dateInput");

const timeInput = document.getElementById("timeInput");

/* =========================================
   NAVIGATION
========================================= */

const dateNext = document.getElementById("dateNext");

const placeNext = document.getElementById("placeNext");

const placeBack = document.getElementById("placeBack");

const timeNext = document.getElementById("timeNext");

const timeBack = document.getElementById("timeBack");

const reviewBack = document.getElementById("reviewBack");

const confirmBtn = document.getElementById("confirmBtn");

/* =========================================
   PLACE
========================================= */

const placeButtons = document.querySelectorAll(".place-btn");

let selectedPlace = "";

/* =========================================
   NO BUTTON
========================================= */

let noAttempts = 0;

/* =========================================
   NO MESSAGES
========================================= */

const noMessages = [
  {
    title: "Are you sure? 🥺",

    text: "You really want to say no?<br>" + "Think about it again... ❤️",
  },

  {
    title: "Really? 😭",

    text: "I prepared this whole thing<br>" + "for you... 🥹",
  },

  {
    title: "Please reconsider 🥺",

    text: "The YES button is literally<br>" + "right there... ❤️",
  },

  {
    title: "Hmm... 🤨",

    text: "I don't think that's the<br>" + "answer you're looking for. 😂",
  },

  {
    title: "Last chance... 😭",

    text: "Are you REALLY sure?<br>" + "Because I'm still waiting. ❤️",
  },
];

/* =========================================
   MINIMUM DATE
========================================= */

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;

/* =========================================
   OPEN ENVELOPE
========================================= */

envelope.addEventListener("click", function () {
  /*
      Open only once.
    */

  if (envelope.classList.contains("open")) {
    return;
  }

  envelope.classList.add("open");

  instruction.innerHTML = `
      <span class="instruction-icon">
        ♥
      </span>

      <span>
        Answer the little question ❤️
      </span>
    `;

  /*
      Set initial NO position.
    */

  setTimeout(function () {
    resetNoButton();
  }, 350);
});

/* =========================================
   YES BUTTON
========================================= */

yesBtn.addEventListener("click", function (event) {
  event.stopPropagation();

  showStep(1);
});

/* =========================================
   NO BUTTON - DESKTOP
========================================= */

/*
   IMPORTANT:

   There is NO mouse tracking here.

   The button only reacts when
   the cursor actually enters it.
*/

noBtn.addEventListener("mouseenter", function () {
  /*
      Show the next funny message.
    */

  showNoMessage();

  /*
      Wait one tiny moment so
      the browser can register
      the hover before moving.
    */

  setTimeout(function () {
    moveNoButton();
  }, 40);
});

/* =========================================
   NO BUTTON - CLICK
========================================= */

noBtn.addEventListener("click", function (event) {
  /*
      NO NEVER proceeds.
    */

  event.preventDefault();

  event.stopPropagation();

  showNoMessage();

  /*
      Run away again.
    */

  setTimeout(function () {
    moveNoButton();
  }, 30);
});

/* =========================================
   NO BUTTON - TOUCH
========================================= */

noBtn.addEventListener("pointerdown", function (event) {
  /*
      Only use this behavior
      for touch devices.

      On desktop, mouseenter
      handles everything.
    */

  if (window.matchMedia("(hover: none)").matches) {
    event.preventDefault();

    event.stopPropagation();

    showNoMessage();

    moveNoButton();
  }
});

/* =========================================
   MOVE NO BUTTON
========================================= */

function moveNoButton() {
  const container = answerButtons.getBoundingClientRect();

  const button = noBtn.getBoundingClientRect();

  const buttonWidth = button.width;

  const buttonHeight = button.height;

  /*
    Padding so NO never
    touches the edges.
  */

  const padding = 5;

  /*
    Safe boundaries.
  */

  const minX = buttonWidth / 2 + padding;

  const maxX = container.width - buttonWidth / 2 - padding;

  const minY = buttonHeight / 2 + padding;

  const maxY = container.height - buttonHeight / 2 - padding;

  /*
    Current position.
  */

  const currentX = parseFloat(noBtn.dataset.x || container.width * 0.72);

  const currentY = parseFloat(noBtn.dataset.y || container.height / 2);

  let newX;
  let newY;

  /*
    Try several random positions.

    We don't want it to move
    just a few pixels away.
  */

  let attempts = 0;

  do {
    newX = minX + Math.random() * (maxX - minX);

    newY = minY + Math.random() * (maxY - minY);

    attempts++;
  } while (
    Math.abs(newX - currentX) < 45 &&
    Math.abs(newY - currentY) < 20 &&
    attempts < 30
  );

  /*
    Save the new position.
  */

  noBtn.dataset.x = newX;

  noBtn.dataset.y = newY;

  /*
    Move the button.
  */

  noBtn.style.left = `${newX}px`;

  noBtn.style.top = `${newY}px`;

  /*
    Small funny rotation.
  */

  const rotation = (Math.random() - 0.5) * 20;

  noBtn.style.transform = `
      translate(
        -50%,
        -50%
      )
      rotate(
        ${rotation}deg
      )
    `;
}

/* =========================================
   RESET NO BUTTON
========================================= */

function resetNoButton() {
  const container = answerButtons.getBoundingClientRect();

  const x = container.width * 0.72;

  const y = container.height / 2;

  noBtn.dataset.x = x;

  noBtn.dataset.y = y;

  noBtn.style.left = `${x}px`;

  noBtn.style.top = `${y}px`;

  noBtn.style.transform = `
      translate(
        -50%,
        -50%
      )
      rotate(0deg)
    `;
}

/* =========================================
   NO MESSAGE
========================================= */

function showNoMessage() {
  noAttempts++;

  const index = Math.min(noAttempts - 1, noMessages.length - 1);

  const message = noMessages[index];

  questionTitle.innerHTML = message.title;

  questionText.innerHTML = message.text;

  instruction.innerHTML = `
    <span class="instruction-icon">
      🥺
    </span>

    <span>
      Come on... try YES ❤️
    </span>
  `;
}

/* =========================================
   SHOW STEP
========================================= */

function showStep(number) {
  steps.forEach(function (step) {
    step.classList.add("hidden");
  });

  finalStep.classList.add("hidden");

  if (number === 5) {
    finalStep.classList.remove("hidden");
  } else {
    steps[number].classList.remove("hidden");
  }

  updateInstruction(number);
}

/* =========================================
   INSTRUCTION
========================================= */

function updateInstruction(step) {
  const messages = {
    1: `
      <span class="instruction-icon">
        📅
      </span>

      <span>
        Choose a date ❤️
      </span>
    `,

    2: `
      <span class="instruction-icon">
        🍴
      </span>

      <span>
        Pick somewhere nice ❤️
      </span>
    `,

    3: `
      <span class="instruction-icon">
        ⏰
      </span>

      <span>
        Pick a time ❤️
      </span>
    `,

    4: `
      <span class="instruction-icon">
        💌
      </span>

      <span>
        Almost there ❤️
      </span>
    `,

    5: `
      <span class="instruction-icon">
        ❤️
      </span>

      <span>
        It's official!
      </span>
    `,
  };

  if (messages[step]) {
    instruction.innerHTML = messages[step];
  }
}

/* =========================================
   DATE NEXT
========================================= */

dateNext.addEventListener("click", function (event) {
  event.stopPropagation();

  if (!dateInput.value) {
    showMessage("Choose a date first ❤️");

    return;
  }

  showStep(2);
});

/* =========================================
   PLACE SELECTION
========================================= */

placeButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.stopPropagation();

    placeButtons.forEach(function (btn) {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedPlace = button.dataset.place;
  });
});

/* =========================================
   PLACE NEXT
========================================= */

placeNext.addEventListener("click", function (event) {
  event.stopPropagation();

  if (!selectedPlace) {
    showMessage("Choose somewhere to eat ❤️");

    return;
  }

  showStep(3);
});

/* =========================================
   PLACE BACK
========================================= */

placeBack.addEventListener("click", function (event) {
  event.stopPropagation();

  showStep(1);
});

/* =========================================
   TIME NEXT
========================================= */

timeNext.addEventListener("click", function (event) {
  event.stopPropagation();

  if (!timeInput.value) {
    showMessage("Choose a time first ❤️");

    return;
  }

  prepareReview();

  showStep(4);
});

/* =========================================
   TIME BACK
========================================= */

timeBack.addEventListener("click", function (event) {
  event.stopPropagation();

  showStep(2);
});

/* =========================================
   REVIEW
========================================= */

function prepareReview() {
  document.getElementById("reviewDate").textContent = formatDate(
    dateInput.value,
  );

  document.getElementById("reviewPlace").textContent = selectedPlace;

  document.getElementById("reviewTime").textContent = formatTime(
    timeInput.value,
  );
}

/* =========================================
   REVIEW BACK
========================================= */

reviewBack.addEventListener("click", function (event) {
  event.stopPropagation();

  showStep(3);
});

/* =========================================
   CONFIRM
========================================= */

confirmBtn.addEventListener("click", function (event) {
  event.stopPropagation();

  document.getElementById("finalDate").textContent = formatDate(
    dateInput.value,
  );

  document.getElementById("finalPlace").textContent = selectedPlace;

  document.getElementById("finalTime").textContent = formatTime(
    timeInput.value,
  );

  showStep(5);

  createHearts();
});

/* =========================================
   FORMAT DATE
========================================= */

function formatDate(value) {
  const date = new Date(value + "T00:00:00");

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* =========================================
   FORMAT TIME
========================================= */

function formatTime(value) {
  const [hours, minutes] = value.split(":");

  const date = new Date();

  date.setHours(Number(hours));

  date.setMinutes(Number(minutes));

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

/* =========================================
   TEMPORARY MESSAGE
========================================= */

function showMessage(message) {
  const existing = document.querySelector(".temporary-message");

  if (existing) {
    existing.remove();
  }

  const element = document.createElement("div");

  element.className = "temporary-message";

  element.textContent = message;

  document.body.appendChild(element);

  setTimeout(function () {
    element.remove();
  }, 1800);
}

/* =========================================
   HEART CELEBRATION
========================================= */

function createHearts() {
  const area = document.querySelector(".surprise-area");

  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("span");

    heart.textContent = "♥";

    heart.style.position = "absolute";

    heart.style.left = `${20 + Math.random() * 60}%`;

    heart.style.top = `${35 + Math.random() * 30}%`;

    heart.style.color = "#e85d75";

    heart.style.fontSize = `${12 + Math.random() * 18}px`;

    heart.style.zIndex = "20";

    heart.style.pointerEvents = "none";

    heart.style.transition = "all 1.5s ease";

    area.appendChild(heart);

    requestAnimationFrame(function () {
      heart.style.transform = `
            translate(
              ${(Math.random() - 0.5) * 350}px,
              ${-100 - Math.random() * 180}px
            )
            rotate(
              ${(Math.random() - 0.5) * 100}deg
            )
          `;

      heart.style.opacity = "0";
    });

    setTimeout(function () {
      heart.remove();
    }, 1600);
  }
}

/* =========================================
   SCREENSHOT BUTTON
========================================= */

document
  .getElementById("screenshotBtn")
  .addEventListener("click", function (event) {
    event.stopPropagation();

    showMessage("📸 Screenshot this and send it to me 😂❤️");
  });

/* =========================================
   RESIZE
========================================= */

window.addEventListener("resize", function () {
  if (envelope.classList.contains("open")) {
    resetNoButton();
  }
});
