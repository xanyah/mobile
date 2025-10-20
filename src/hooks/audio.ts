import { useCallback, useEffect, useRef } from "react";
import { Image } from "react-native";
import { AudioBuffer, AudioContext } from "react-native-audio-api";

export const useAudioPlayer = (audioFile: any) => {
  const audioContext = useRef(new AudioContext());
  const audioBuffer = useRef<AudioBuffer>(null)

  const loadFile = useCallback(async () => {
    const { uri } = Image.resolveAssetSource(audioFile)

    const response = await fetch(uri)
    const arrayBuffer = await response.arrayBuffer()
    audioBuffer.current = await audioContext.current.decodeAudioData(arrayBuffer)
  }, [audioFile])

  useEffect(() => {
    loadFile()
  }, [loadFile])

  const play = useCallback(() => {
    const playerNode = audioContext.current.createBufferSource();
    playerNode.buffer = audioBuffer.current;

    playerNode.connect(audioContext.current.destination);
    playerNode.start(audioContext.current.currentTime);
  }, [])

  return {
    play
  }
}
