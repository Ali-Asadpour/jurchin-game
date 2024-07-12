let $ = document
let imgSrcList = ["./assets/img/1.jpg", "./assets/img/2.jpg", "./assets/img/3.jpg", "./assets/img/4.jpg", "./assets/img/5.jpg", "./assets/img/6.jpg", "./assets/img/7.jpg", "./assets/img/8.jpg","./assets/img/1.jpg", "./assets/img/2.jpg", "./assets/img/3.jpg", "./assets/img/4.jpg", "./assets/img/5.jpg", "./assets/img/6.jpg", "./assets/img/7.jpg", "./assets/img/8.jpg",]
let randomList = []
let cardItems = $.querySelector(".card-items")
let volumeIcom = $.querySelector(".volume-icon")
let audioTrue = $.querySelector(".audio-true")
let audioFalse = $.querySelector(".audio-false")
let audioEnd = $.querySelector(".audio-end")
let scoreNumberElement = $.querySelector(".score-number")


// volume setings

let volumeFlag = 0
volumeIcom.addEventListener("click", function () {
    if (volumeFlag == 0) {
        volumeIcom.src = "./assets/img/volume-open.png"
        volumeFlag = 1
    } else {
        volumeIcom.src = "./assets/img/volume-close.png"
        volumeFlag = 0
    }
})


// make a list of random numbers

for (var i = 0; i < imgSrcList.length; i++) {
    randomIndex = parseInt(Math.random() * 16)
    while (randomList.includes(randomIndex)) {
        randomIndex = parseInt(Math.random() * 16)
    }
    randomList.push(randomIndex)
}


// add cards to card container

for (var i = 0; i < imgSrcList.length; i++) {
    let cardItem = $.createElement("div")
    cardItem.className = "card-item"

    let cardItemImg = $.createElement("img")
    cardItemImg.className = "card-item-img img-hide"
    cardItemImg.src = imgSrcList[randomList[i]]

    cardItem.addEventListener("click", function () {
        chageCards(cardItem, cardItemImg)
    })

    cardItem.append(cardItemImg)
    cardItems.append(cardItem)
}


// do works for change cards => when card click

let saveImgList = []
let listFlag = 0
let scoreNumber = 0
let elementsEndWorkList = []

function chageCards(cardItem, cardItemImg) {
    if (!elementsEndWorkList.includes(cardItem)) {
        if (saveImgList.length == 1 && saveImgList[0].element == cardItem) {
            null
        } else if (saveImgList.length <= 1) {
            cardItem.classList.add("show-rotate")
            setTimeout(function () {
                cardItemImg.classList.add("img-show")
                cardItemImg.classList.remove("img-hide")
            }, 200)
            saveImgList.push({
                src: cardItemImg.src,
                element: cardItem,
                img: cardItemImg,
            })
        }
    }


    if (saveImgList.length == 2) {
        if (saveImgList[0].src != saveImgList[1].src) {
            
            if (volumeFlag == 1){
                audioFalse.play()
            }
            setTimeout(function () {

                saveImgList[0].element.classList.remove("show-rotate")
                saveImgList[1].element.classList.remove("show-rotate")

                setTimeout(function () {

                    saveImgList[0].img.classList.remove("img-show")
                    saveImgList[0].img.classList.add("img-hide")

                    saveImgList[1].img.classList.remove("img-show")
                    saveImgList[1].img.classList.add("img-hide")

                    
                    listFlag = 1
                    
                }, 150)
            }, 700)
            
            
            
        } else {
            elementsEndWorkList.push(saveImgList[0].element)
            elementsEndWorkList.push(saveImgList[1].element)
            console.log(elementsEndWorkList);
            listFlag = 1

            if (volumeFlag == 1) {
                audioTrue.play()
            }

            scoreNumber += 2
            if (scoreNumber == 16){
                scoreNumberElement.innerHTML = "Winner!!!"
                if (volumeFlag == 1) {
                    audioEnd.play()
                }
            } else {
                scoreNumberElement.innerHTML = "SCORE : " + scoreNumber
            }     
        }
    }
}


setInterval(function () {
    if (listFlag == 1) {
        saveImgList = []
        listFlag = 0
    }
}, 100)