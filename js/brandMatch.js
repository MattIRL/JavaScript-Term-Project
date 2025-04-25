$(document).ready(function () {

  // Make buttons functional
  $("#reset").click(function () {
    window.location.reload();
  });
  $("#home").click(function () {
    window.location.href = "Games.html";
  });

  $("#autocross").click(function () {
    window.location.href = "autocross.html";
  });

  $("#trivia").click(function () {
    window.location.href = "trivia.html";
  });

  $("#readMe").click(function () {
    window.location.href = "readme.txt";
  });
  // Set variables for scoring
  var correct = 0;
  var total = 0;
  $("#correct").text(correct);
  $("#total").text(total);
  const totalDraggableItems = 7;
  const totalMatchingPairs = 5;
  const brands = [
    {
      imgName: "abarth",
      brandName: "Abarth"
    },
    {
      imgName: "acura",
      brandName: "Acura"
    },
    {
      imgName: "audi",
      brandName: "Audi"
    },
    {
      imgName: "bentley",
      brandName: "Bentley"
    },
    {
      imgName: "bmw",
      brandName: "BMW"
    },
    {
      imgName: "buick",
      brandName: "Buick"
    },
    {
      imgName: "cadillac",
      brandName: "Cadillac"
    },
    {
      imgName: "chevrolet",
      brandName: "Chevrolet"
    },
    {
      imgName: "citroen",
      brandName: "Citroen"
    },
    {
      imgName: "daewoo",
      brandName: "Daewoo"
    },
    {
      imgName: "ferrari",
      brandName: "Ferrari"
    },
    {
      imgName: "honda",
      brandName: "Honda"
    },
    {
      imgName: "hyundai",
      brandName: "Hyundai"
    },
    {
      imgName: "jaguar",
      brandName: "Jaguar"
    },
    {
      imgName: "lexus",
      brandName: "Lexus"
    },
    {
      imgName: "leyland",
      brandName: "Layland"
    },
    {
      imgName: "maserati",
      brandName: "Maserati"
    },
    {
      imgName: "maybach",
      brandName: "Maybach"
    },
    {
      imgName: "mercedesBenz",
      brandName: "Mercedes-Benz"
    },
    {
      imgName: "mercury",
      brandName: "Mercury"
    }, 
    {
      imgName: "mitsubishi",
      brandName: "Mitsubishi"
    }, 
    {
      imgName: "peugeot",
      brandName: "Peugeot"
    }, 
    {
      imgName: "renault",
      brandName: "Renault"
    }, 
    {
      imgName: "rivian",
      brandName: "Rivian"
    }, 
    {
      imgName: "saturn",
      brandName: "Saturn"
    },
    {
      imgName: "subaru",
      brandName: "Subaru"
    },
    {
      imgName: "suzuki",
      brandName: "Suzuki"
    }, 
    {
      imgName: "tesla",
      brandName: "Tesla"
    }, 
    {
      imgName: "toyota",
      brandName: "Toyota"
    },
    {
      imgName: "vw",
      brandName: "Volkswagen"
    }
  ]

  // Variables for creating random icons and arary
  const score = document.querySelector(".score");
  const draggableElements = document.querySelector(".draggable-elements");
  const droppableElements = document.querySelector(".droppable-elements");
  // Limit the new random list of brands to 5 based on totalDraggableItems.
  const randomDraggableBrands = generateRandomItemsArray(totalDraggableItems, brands);
  const randomDroppableBrands = totalMatchingPairs < totalDraggableItems ? generateRandomItemsArray(totalMatchingPairs, randomDraggableBrands) : randomDraggableBrands;
  const alphaSortedDrop = [...randomDroppableBrands].sort((a, b) => a.brandName.localeCompare(b.brandName));

  // Create "draggable-items" and append to DOM
  for (var i = 0; i < randomDraggableBrands.length; i++) {
    draggableElements.insertAdjacentHTML("beforeend", `<img  src="media/logos/${randomDraggableBrands[i].imgName}.png" class="draggable" draggable="true" id="${randomDraggableBrands[i].imgName}">`);
  }
  // Create "droppable" divs and appending to DOM
  for (var i = 0; i < alphaSortedDrop.length; i++) {
    droppableElements.insertAdjacentHTML("beforeend", `<div class="droppable" data-draggable-id="${alphaSortedDrop[i].imgName}">
      <span>${alphaSortedDrop[i].brandName}</span></div>`)
  }

  // Creating random array from brands array
  function generateRandomItemsArray(n, originalArray) {
    let res = [];
    let clonedArray = [...originalArray];
    if (n > clonedArray.length) n = clonedArray.length;
    for (let i = 1; i <= n; i++) {
      const randomIndex = Math.floor(Math.random() * clonedArray.length);
      res.push(clonedArray[randomIndex]);
      clonedArray.splice(randomIndex, 1);
    }
    return res;
  }

  // set event on draggable items and transfer ID to cache
  $(".draggable").on("dragstart", function (event) {
    event.originalEvent.dataTransfer.setData("text", $(this).attr("id"));
  });
  // Set event functionality for dragEnter, dragOver, dragLeave
  $(".droppable")
    .on("dragenter", function (event) {
      if (!$(this).hasClass("dropped")) {
        $(this).addClass("droppable-hover");
      }
    })
    .on("dragover", function (event) {
      if (!$(this).hasClass("dropped")) {
        event.preventDefault();
      }
    })
    .on("dragleave", function (event) {
      if (!$(this).hasClass("dropped")) {
        $(this).removeClass("droppable-hover");
      }
    })
    // Sets logic aroudn the drop function including correct check
    .on("drop", function (event) {
      event.preventDefault();
      $(this).removeClass("droppable-hover");
      // update total variable
      total++;
      // update total span
      $("#total").text(total);
      // create objects for checking correct answer
      const draggableElementData = event.originalEvent.dataTransfer.getData("text");
      const droppableElementData = $(this).attr("data-draggable-id");
      const isCorrectMatching = draggableElementData === droppableElementData;

      if (isCorrectMatching) {
        //update score variable
        correct++;
        // update correct span
        $("#correct").text(correct);
        const draggableElement = $("#" + draggableElementData);
        $(this).addClass("dropped");
        draggableElement.addClass("dragged");
        draggableElement.attr("draggable", "false");
        const imgClone = draggableElement.clone();
        imgClone.css({
          height: "70%",
          width: "70%",
          opacity: 1.0
        });
        $(this).prepend(imgClone);
      }

      if (correct == 5) {
        score.insertAdjacentHTML("beforeend", `<span style="color: #a2150c"><em>&nbspGood job!<em></span>`)
      }
    });
});

