import React from "react";

function Read(param) {
    let utterance = new SpeechSynthesisUtterance(param);
    speechSynthesis.speak(utterance);
  }

export default Read;