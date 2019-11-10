import SentenceDecoder from "./SentenceDecoder";

interface Match {
  [key: string]: string;
}

const defaultChars = "abcdefghijklmnopqrstuvwxyzåäö";

export default class CeasarDecoder implements SentenceDecoder {
  private matches: Match = {};

  public static createDecoders(chars:string = defaultChars): CeasarDecoder[] {
    const decoders: CeasarDecoder[] = [];
    for (let i = 1; i <= chars.length; i++) {
      decoders.push(new CeasarDecoder(i, chars));
    }
    return decoders;
  }

  constructor(private swapCount: number, private chars:string = defaultChars) {
    this.createMatches();
  }

  private createMatches(): void {
    for (let i = 0; i < this.chars.length; i++) {
      const char = this.chars[i];
      let newPosition = i - this.swapCount;
      if (newPosition < 0) {
        newPosition = this.chars.length + newPosition;
      }
      this.matches[char] = this.chars[newPosition];
    }
  }

  decode(sentence: string): string {
    sentence = sentence.toLowerCase();
    let newSentence = [];
    for (let i = 0; i < sentence.length; i++) {
      const char = sentence[i];
      const match = this.matches[char];
      newSentence.push(match ? match : char);
    }
    return newSentence.join("");
  }
}