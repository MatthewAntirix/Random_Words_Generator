import React, {useState} from 'react'
import {words} from "./words"
import {cz} from "./language_cz"
import {en} from "./language_en"
import "./basic.css"

let language
let languageSwitch = "en"
    if (languageSwitch === "cz") {
        language = cz
    } else {
        language = en
    }


export const RandomWordsGenerator = () => {
    const [min, setMin] = useState(25)
    const [max, setMax] = useState(50)
    const [paragraphs, setParagraphs] = useState(3)

    const paragraphCount = (paragraphs > 10) ? 10 : parseInt(paragraphs)
    let minWordsCount = (min > 100) ? 100 : parseInt(min) || min < 1 ? 1 : parseInt(min)
    let maxWordsCount = (max > 100) ? 100 : parseInt(max) || max < 1 ? 1 : parseInt(min)
        let wordsCount
        let [paragraphsArray, randomWordsArray] = [[], []]
        let [paragraphIndex, wordIndex] = [0, 0]
        let newRandomWord
        let randomDot = 0
        let dotStatus = false
        let capitalStatus = true

        if (minWordsCount > maxWordsCount) {
            let corrector
            corrector = maxWordsCount
            maxWordsCount = minWordsCount
            minWordsCount = corrector
        }


const CreateList = () => {
    while (paragraphIndex < paragraphCount) {
        wordsCount = Math.ceil(Math.random()*(maxWordsCount - minWordsCount)) + minWordsCount
        capitalStatus = true

        while (wordIndex < wordsCount) {
            newRandomWord = (words[Math.floor(Math.random(0, 1)*words.length)])

            // eslint-disable-next-line eqeqeq
            if (capitalStatus == true) {
                newRandomWord = newRandomWord[0].toUpperCase() + newRandomWord.slice(1)
                capitalStatus = false
            }

            if  (randomDot > 5) {
                dotStatus = Math.round(Math.random(0, 1))

                // eslint-disable-next-line eqeqeq
                if (dotStatus == true) {
                    randomDot = 0
                    dotStatus = false
                    capitalStatus = true
                    newRandomWord = newRandomWord + "."
                }
            }  

            if (wordIndex === wordsCount-1) {
                newRandomWord = newRandomWord + "."
            }

            randomWordsArray.push(newRandomWord)
            wordIndex++
            randomDot++
        }

        paragraphsArray.push(randomWordsArray)
        randomWordsArray = []
        paragraphIndex++
        wordIndex = 0
    }
}

CreateList()

    return (
        <>
            <h1>{language.title}</h1>
                <div>
                    <input type={"number"} min="1" max="100" placeholder={language.minWordsCount} onChange={e => setMin(e.target.value)}></input>
                    <input type={"number"} min="1" max="100"  placeholder={language.maxWordsCount} onChange={e => setMax(e.target.value)}></input>
                    <input type={"number"} min="1" max="10" placeholder={language.paragraphCount} onChange={e => setParagraphs(e.target.value)}></input>
                </div>

                {paragraphsArray.map((paragraph, index) => 
                    <p key={index}>
                        {paragraph.map ((word, index) =>
                            <span key={index}>{word} </span>
                            )}
                    </p>
                )}
        </>
    )
}





