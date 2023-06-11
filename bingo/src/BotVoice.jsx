import React from "react";

const Speak = (param) => {
    let utterance = new SpeechSynthesisUtterance(param);
    utterance.lang = 'es-ES';
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'es-ES');
    speechSynthesis.speak(utterance);
  }
export default Speak;

/*
const speakPhrase = (number) => {
  const phrase = phrases[number];
  const numberString = number;
  
  const leer = new SpeechSynthesisUtterance(number);
  leer.lang = 'es-ES';
  leer.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'es-ES');
  speechSynthesis.speak(leer);
  if (phrase && Math.floor(Math.random() * 7) === 0 ) {
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = 'es-ES'; // Establece el idioma a español de España
    utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'es-ES'); // Configura la voz en español
    speechSynthesis.speak(utterance);
  }

};*/