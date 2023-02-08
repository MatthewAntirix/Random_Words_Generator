import React from 'react'
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

const paragraphCount = 4
const minWordsCount = 30
const maxWordsCount = 120
let wordsCount
let [paragraphsArray, randomWordsArray] = [[], []]
let [paragraphIndex, wordIndex] = [0, 0]
let newRandomWord
let randomDot = 0
let dotStatus = false
let capitalStatus = true


while (paragraphIndex < paragraphCount) {
    wordsCount = Math.ceil(Math.random() * (maxWordsCount - minWordsCount) + minWordsCount)

    while (wordIndex < wordsCount) {
        newRandomWord = (words[Math.floor(Math.random(0, 1)*words.length)])

        if (capitalStatus == true) {
            newRandomWord = newRandomWord[0].toUpperCase() + newRandomWord.slice(1)
            capitalStatus = false
        }

        if  (randomDot > 5) {
            dotStatus = Math.round(Math.random(0, 1))

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



export const RandomWordsGenerator = () => {

    return (
        <>
            <h1>{language.title}</h1>
            <div>
                <input placeholder={language.minWordsCount}></input>
                <input placeholder={language.maxWordsCount}></input>
                <input placeholder={language.paragraphCount}></input>
            </div>

            {paragraphsArray.map(paragraph => 
                <p key={paragraph}>
                    {paragraph.map (word =>
                        <>{word} </>
                    )}
                </p>
            )}
        </>
    )
}





